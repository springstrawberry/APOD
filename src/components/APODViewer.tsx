import { useState, useEffect } from 'react';
import { Calendar, Loader2, ChevronLeft, ChevronRight, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { fetchAPOD, formatDate, getTodayDate, getYesterdayDate } from '@/lib/api';
import type { APODData } from '@/types/apod';

export default function APODViewer() {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [showNoApodDialog, setShowNoApodDialog] = useState(false);

  useEffect(() => {
    // Initialize with the most recent available APOD
    initializeAPOD();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadAPOD(selectedDate);
    }
  }, [selectedDate]);

  async function initializeAPOD() {
    setLoading(true);
    setError(null);
    
    // Try today first, if it fails, try yesterday
    let dateToTry = getTodayDate();
    
    try {
      const data = await fetchAPOD(dateToTry);
      setApodData(data);
      setSelectedDate(dateToTry);
    } catch (err) {
      // If today fails (404), try yesterday
      try {
        dateToTry = getYesterdayDate();
        const data = await fetchAPOD(dateToTry);
        setApodData(data);
        setSelectedDate(dateToTry);
      } catch (retryErr) {
        setError(retryErr instanceof Error ? retryErr.message : 'Failed to load APOD');
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadAPOD(date: string) {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchAPOD(date);
      setApodData(data);
    } catch (err) {
      // If the requested date doesn't have APOD yet (404), try previous days
      if (err instanceof Error && err.message.includes('not available for this date')) {
        await loadPreviousAvailableAPOD(date);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load APOD');
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadPreviousAvailableAPOD(requestedDate: string) {
    let dateToTry = new Date(requestedDate);
    const oldestDate = new Date('1995-06-16');
    let attempts = 0;
    const maxAttempts = 7; // Try up to 7 days back
    
    while (attempts < maxAttempts && dateToTry >= oldestDate) {
      dateToTry.setDate(dateToTry.getDate() - 1);
      attempts++;
      
      try {
        const data = await fetchAPOD(formatDate(dateToTry));
        setApodData(data);
        setSelectedDate(formatDate(dateToTry));
        return;
      } catch (err) {
        // Continue to previous day
        continue;
      }
    }
    
    // If we still couldn't find one, show error
    setError('Unable to load APOD. Please try a different date.');
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(e.target.value);
    setIsDatePickerOpen(false);
  }

  function goToPreviousDay() {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(formatDate(date));
  }

  function goToNextDay() {
    const today = getTodayDate();
    if (selectedDate >= today) return;
    
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    setSelectedDate(formatDate(date));
  }

  async function goToToday() {
    const today = getTodayDate();
    
    // Check if today's APOD is available
    try {
      setLoading(true);
      const data = await fetchAPOD(today);
      setApodData(data);
      setSelectedDate(today);
      setError(null);
    } catch (err) {
      // Today's APOD is not available yet
      if (err instanceof Error && err.message.includes('not available for this date')) {
        setShowNoApodDialog(true);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load APOD');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleDialogClose() {
    setShowNoApodDialog(false);
    // Load the most recent available APOD
    initializeAPOD();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-neutral-200 animate-spin mx-auto mb-4" />
          <p className="text-neutral-200 text-lg">Loading Astronomy Picture...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-800 flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-400 text-xl font-bold mb-2">Error</h2>
          <p className="text-neutral-200">{error}</p>
          <Button onClick={() => loadAPOD(selectedDate)} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!apodData) return null;

  const isToday = selectedDate === getTodayDate();
  const isYesterday = selectedDate === getYesterdayDate();
  const showDateNotice = !isToday && (isYesterday || selectedDate < getTodayDate());

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-800">
      {/* Date notice */}
      {showDateNotice && (
        <div className="bg-neutral-800/50 border-b border-neutral-700 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center gap-2 text-neutral-300">
              <Info className="w-4 h-4" />
              <p className="text-sm">
                {isYesterday 
                  ? "Today's APOD hasn't been published yet. Showing yesterday's picture."
                  : `Showing the most recent available APOD from ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-neutral-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-100">
              NASA Astronomy Picture of the Day
            </h1>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousDay}
                className="bg-neutral-800/50 border-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:text-white hover:border-neutral-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  className="bg-neutral-800/50 border-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:text-white hover:border-neutral-600"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Button>
                
                {isDatePickerOpen && (
                  <div className="absolute right-0 mt-2 z-10">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      max={getTodayDate()}
                      min="1995-06-16"
                      className="bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    />
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNextDay}
                disabled={isToday}
                className="bg-neutral-800/50 border-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:text-white hover:border-neutral-600 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              {!isToday && (
                <Button
                  variant="outline"
                  onClick={goToToday}
                  className="bg-neutral-800/50 border-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:text-white hover:border-neutral-600"
                >
                  Today
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-2">
              {apodData.title}
            </h2>
            <p className="text-neutral-300 text-lg">
              {new Date(apodData.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Media */}
          <div className="mb-6 rounded-lg overflow-hidden shadow-2xl border border-neutral-700/50">
            {apodData.media_type === 'image' ? (
              <img
                src={apodData.url}
                alt={apodData.title}
                className="w-full h-auto"
              />
            ) : (
              <div className="relative pb-[56.25%]">
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="bg-black/30 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-neutral-100 mb-3">Explanation</h3>
            <p className="text-neutral-200 leading-relaxed whitespace-pre-line">
              {apodData.explanation}
            </p>
            {apodData.copyright && (
              <p className="text-neutral-400 mt-4 text-sm">
                © {apodData.copyright}
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-neutral-700/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-neutral-400">
          <p>
            Data provided by{' '}
            <a
              href="https://www.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-200 hover:text-white underline transition-colors"
            >
              NASA
            </a>
          </p>
        </div>
      </footer>

      {/* No APOD Available Dialog */}
      <Dialog open={showNoApodDialog} onOpenChange={setShowNoApodDialog}>
        <DialogContent className="bg-neutral-900 border-neutral-700 text-neutral-100">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              </div>
              <DialogTitle className="text-2xl">No Picture Available Yet</DialogTitle>
            </div>
            <DialogDescription className="text-neutral-300 text-base">
              Today's Astronomy Picture of the Day hasn't been published yet. 
              NASA typically publishes new pictures around midnight US Eastern Time.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <p className="text-neutral-400 text-sm">
              Would you like to view the most recent available picture instead?
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={handleDialogClose}
              className="bg-neutral-700 hover:bg-neutral-600 text-white"
            >
              View Latest Available
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

