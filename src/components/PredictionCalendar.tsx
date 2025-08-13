import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { format, addDays, parseISO, endOfMonth, subMonths } from "date-fns"
import { useLanguage } from '@/contexts/LanguageContext';

export function PredictionCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [highlightDates, setHighlightDates] = useState<Date[]>([])
    const [open, setOpen] = useState(false)
  const { getLocalizedText } = useLanguage();

    const buttonRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("savedDatesByMonth") || "{}")
        const allStoredDates = Object.values(stored).flat()
        const parsed = allStoredDates.map((d) => parseISO(d as string))
        setHighlightDates(parsed)
    }, [])

    useEffect(() => {
        if (selectedDate) {
            const nextDates = Array.from({ length: 5 }, (_, i) => addDays(selectedDate, i + 1))
            setHighlightDates(nextDates)

            const allDates = [selectedDate, ...nextDates]
            const formattedDates = allDates.map(d => format(d, "yyyy-MM-dd"))

            const monthKey = format(selectedDate, "LLLL yyyy") // e.g., "June 2025"
            const existing = JSON.parse(localStorage.getItem("savedDatesByMonth") || "{}")

            // if (!existing[monthKey]) {
            //     existing[monthKey] = []
            // }

            existing[monthKey] = formattedDates;

            // const updatedMonthDates = Array.from(new Set([...existing[monthKey], ...formattedDates]))
            // existing[monthKey] = updatedMonthDates

            localStorage.setItem("savedDatesByMonth", JSON.stringify(existing))

            const stored = JSON.parse(localStorage.getItem("savedDatesByMonth") || "{}")
            const allStoresDates = Object.values(stored).flat()
            const parsed = allStoresDates.map((d) => parseISO(d as string))
            setHighlightDates(parsed)
        }
    }, [selectedDate])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    ref={buttonRef}
                    className="flex items-center  gap-1 px-2 py-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                    <CalendarIcon className="w-4 h-4 text-xs  text-slate-800 dark:text-white" />
                    <span className="text-xs text-slate-800 dark:text-white">{getLocalizedText('period.prediction.cycle')}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                avoidCollisions={false}
                style={{ marginTop: "-14em" }}

                className="z-50 ml-28  w-auto p-2 rounded-xl shadow-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="space-y-2">
                    <h3 className="text-lg font-bold text-center text-lavender-600">
                        {getLocalizedText('provide.six.months.cycle.data')}
                    </h3>
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            setSelectedDate(date)
                        }}
                        defaultMonth={subMonths(new Date(), 6)}
                        disabled={{
                            after: endOfMonth(new Date()), 
                        }}

                        className="dark:text-white "
                        modifiers={{
                            dotted: highlightDates,
                        }}
                        modifiersClassNames={{
                            dotted:
                                "relative text-black dark:text-white font-semibold after:content-[''] after:absolute after:inset-0 after:rounded-full after:border after:border-[2px] after:border-dotted after:border-red-500 after:scale-110 after:pointer-events-none",
                        }}
                    />
                
                    <Button   className="flex items-center text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    onClick={()=>setOpen(false)}
                    >
                        {getLocalizedText('close')}
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}