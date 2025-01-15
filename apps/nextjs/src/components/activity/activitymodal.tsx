import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { cn } from '~/utils/utils'
import { Calendar } from '../ui/calendar'

const ActivityModal = () => {
    const [date, setDate] = React.useState<Date>()
    return (
        <div className='w-screen h-screen bg-black/80 flex justify-center items-center fixed top-0 left-0'>
            <form className='m-12 w-full min-w-[320px] sm:w-2/3 lg:w-1/2 xl:w-2/5 sm:h-2/3 border-b-2 bg-white rounded-lg max-sm:text-sm font-semibold p-6 sm:p-12 flex gap-3 flex-col'>
                <div className='flex flex-col gap-2'>
                    <label>Title</label>
                    <input type='text' className='bg-slate-200 rounded-md p-3 font-normal text-sm focus:bg-gray-100 focus:outline-none' />
                </div>
                <div className='flex flex-col lg:flex-row gap-3'>
                    <div className='flex flex-col gap-2 lg:w-2/5'>
                        <label>Date</label>
                        <Popover>
                            <PopoverTrigger asChild className='bg-slate-200 rounded-md p-3 font-normal focus:bg-gray-100 focus:outline-none h-full border-none w-full'>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className='flex flex-col gap-2 lg:w-3/5'>
                        <label>Time</label>
                        <div className='flex items-center gap-2'>
                            <input type='time' className='bg-slate-200 rounded-md p-3 font-normal text-sm focus:bg-gray-100 focus:outline-none w-full' />
                            <span className='text-sm'>to</span>
                            <input type='time' className='bg-slate-200 rounded-md p-3 font-normal text-sm    focus:bg-gray-100 focus:outline-none w-full' />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label>Location</label>
                    <input type='text' className='bg-slate-200 rounded-md p-3 font-normal text-sm    focus:bg-gray-100 focus:outline-none w-full' />
                </div>
                <div className='flex flex-col gap-2 h-full'>
                    <label>Description</label>
                    <textarea className='bg-slate-200 rounded-md p-3 font-normal text-sm    focus:bg-gray-100 focus:outline-none w-full h-full resize-none' />
                </div>
                <div className='flex gap-3 self-end text-xs sm:text-sm text-center'>
                    <button className='bg-gray-200 rounded-full px-5 sm:px-10 py-3 w-fit text-black font-normal'>Cancel</button>
                    <button className='bg-black rounded-full px-3 sm:px-5 py-3 w-fit text-white font-normal'>Create Activity</button>
                </div>

            </form>
        </div>

    )
}

export default ActivityModal