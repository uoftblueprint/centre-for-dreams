import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { cn } from '~/lib/utils'
import { Calendar } from '../ui/calendar'
import { api } from "~/utils/api";
import type { RouterInputs } from "~/utils/api";
import { useForm } from "react-hook-form";

export type UpdateAnnouncement = RouterInputs["activity"]["updateActivity"];

const ActivityUpdateModal = ({ open, setOpen, id }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, id: number }) => {
    const [date, setDate] = useState<Date | null>()
    const [startTime, setStartTime] = useState<Date | null>();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<UpdateAnnouncement>();

    const activity = api.activity.getActivity.useQuery({ id: id });

    const [isSuccess, setIsSuccess] = useState(false);

    const { mutate: updateActivity } = api.activity.updateActivity.useMutation({
        onSuccess: () => {
            setIsSuccess(true);
            reset();
            setDate(null)
            setStartTime(null)
            setOpen(false);
        },
    });

    const handleInputChange = () => {
        if (isSuccess) {
            setIsSuccess(false);
            reset();
        }
    };

    const onSubmit = (data: UpdateAnnouncement) => {
        data.day = date || new Date();
        data.startTime = startTime || new Date();
        data.durationMinutes = parseInt(data.durationMinutes ? data.durationMinutes.toString() : "15", 10)
        updateActivity({
            id: data.id,
            name: data.name,
            location: data.location,
            day: data.day,
            startTime: data.startTime,
            durationMinutes: data.durationMinutes,
            leader: data.leader
        });
    };

    useEffect(() => {
        if (activity.data) {
            reset(activity.data);
            setDate(activity.data.day)
            setStartTime(activity.data.startTime)
        }
      }, [activity.data, reset]);

    return (
        <div className={`w-screen h-screen bg-black/80 flex justify-center items-center fixed top-0 left-0 ${open ? "" : "invisible"}`} onSubmit={handleSubmit(onSubmit)}>
            {activity.data && <form className='m-12 w-full min-w-[320px] sm:w-2/3 lg:w-1/2 xl:w-2/5 border-b-2 bg-white rounded-lg max-sm:text-sm font-semibold p-6 sm:p-12 flex gap-3 flex-col'>
                <div className='flex flex-col gap-2'>
                    <label>Title</label>
                    <input required {...register("name", { required: true })} name='name' onChange={handleInputChange} type='text' className='bg-slate-200 rounded-md p-3 font-normal text-sm focus:bg-gray-100 focus:outline-none hover:bg-slate-200/70' />
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
                                    selected={date || new Date()}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className='flex gap-2 w-full'>
                        <div className='w-full flex flex-col gap-2'>
                            <label>Time</label>
                            <input onChange={(e) => {
                                const [hours, minutes] = e.target.value.split(":").map(Number);
                                const time = new Date();
                                time.setUTCHours(hours || 0, minutes, 0, 0);
                                setStartTime(time);
                            }}
                                value={startTime ? new Date(startTime.toLocaleString("en-US", { timeZone: "America/New_York" })).toISOString().substring(11, 16) : ''}
                                required name='startTime' type='time' className='bg-slate-200 rounded-md p-3 font-normal text-sm focus:bg-gray-100 focus:outline-none w-full hover:bg-slate-200/70 cursor-pointer' />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <label>Duration (Minutes)</label>
                            <input {...register("durationMinutes", { required: true })} name='durationMinutes' required min={15} type='number' className='bg-slate-200 rounded-md p-3 font-normal text-sm    focus:bg-gray-100 focus:outline-none w-full hover:bg-slate-200/70 cursor-pointer' />
                        </div>

                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label>Location</label>
                    <input {...register("location", { required: true })} onChange={handleInputChange} required name='location' type='text' className='bg-slate-200 rounded-md p-3 font-normal text-sm    focus:bg-gray-100 focus:outline-none w- hover:bg-slate-200/70' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label>Leader</label>
                    <input {...register("leader", { required: true })} onChange={handleInputChange} required name='leader' type='text' className='bg-slate-200 rounded-md p-3 font-normal text-sm    focus:bg-gray-100 focus:outline-none w- hover:bg-slate-200/70' />
                </div>

                <div className='flex gap-3 self-end text-xs sm:text-sm text-center'>
                    <button className='bg-gray-200 rounded-full px-5 sm:px-10 py-3 w-fit text-black font-normal' type="button" onClick={() => setOpen(false)}>Cancel</button>
                    <button className='bg-black rounded-full px-3 sm:px-5 py-3 w-fit text-white font-normal' type='submit'>Update Activity</button>
                </div>
            </form>}
        </div>
    )
}

export default ActivityUpdateModal