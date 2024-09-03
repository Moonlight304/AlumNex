import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const backendURL = import.meta.env.VITE_backendURL;

export function NewEvent() {
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');
    const [speakers, setSpeakers] = useState([]);
    const [schedule, setSchedule] = useState('');
    const [sponsors, setSponsors] = useState([]);
    const [tag, setTag] = useState('');

    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const speakersArray = speakers.split(',').map(speaker => speaker.trim());
            const sponsorsArray = sponsors.split(',').map(sponsor => sponsor.trim());

            const response = await axios.post(`${backendURL}/events/newEvent`,
                { name, start, end, venue, description, schedule, tag, speakers : speakersArray, sponsors : sponsorsArray },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                    }
                }
            );
            const data = response.data;

            if (data.status === 'success') {
                navigate(`/events/${data.data}`);
                toast.success('Created Event!');
            }
            else {
                console.log('Error creating event');
                toast.error(`An error occurred ${data.message}`);
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }


    return (
        <div className="bg-[#ebe4d5] p-4 md:p-8 font-mono">
            <div className="max-w-2xl mx-auto bg-[#e6d8c6] p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-sans font-bold mb-4 text-[#483312]">
                    Create New Event
                </h1>
                <p className="mb-6 text-gray-700">
                    Fill out the form below to add a new event.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="event-name" className="block text-gray-700 mb-2">
                                Event Name
                            </label>
                            <input
                                type="text"
                                id="event-name"
                                placeholder="Enter event name"
                                className="w-full p-2 border border-amber-300 rounded bg-[#ebe4d5] text-gray-700"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="event-location" className="block text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                id="event-location"
                                placeholder="Enter event location"
                                className="w-full p-2 border border-amber-300 rounded bg-[#ebe4d5] text-gray-700"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                            />

                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="event-start-date" className="block text-gray-700 mb-2">
                                    Start
                                </label>
                                <input
                                    type='datetime-local'
                                    id="event-start-date"
                                    placeholder="Event start"
                                    className="w-full p-2 border border-amber-300 rounded bg-[#ebe4d5] text-gray-700"
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="event-end-date" className="block text-gray-700 mb-2">
                                    End
                                </label>
                                <input
                                    type='datetime-local'
                                    id="event-end-date"
                                    placeholder="Event end"
                                    className="w-full p-2 border border-amber-300 rounded bg-[#ebe4d5] text-gray-700"
                                    value={end}
                                    onChange={(e) => setEnd(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="event-description" className="block text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="event-description"
                            rows="3"
                            placeholder="Provide details about the event"
                            className="w-full p-2 border border-amber-300 rounded bg-[#ebe4d5] text-gray-700"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="event-image" className="block text-gray-700 mb-2">
                            Event Image
                        </label>
                        <input
                            type="file"
                            id="event-image"
                            className="w-full p-2 border border-amber-300 rounded bg-[#ebe4d5] text-gray-700"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="event-speakers" className="block text-gray-700 mb-2">
                            Speakers
                        </label>
                        <textarea
                            id="event-speakers"
                            rows="2"
                            placeholder="Enter speaker names and details"
                            className="w-full p-2 border border-amber-300 rounded bg-[#ebe4d5] text-gray-700"
                            value={speakers}
                            onChange={(e) => setSpeakers(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="event-schedule" className="block text-gray-700 mb-2">
                            Schedule
                        </label>
                        <textarea
                            id="event-schedule"
                            rows="3"
                            placeholder="Enter event schedule"
                            className="w-full p-2 border border-amber-300 rounded bg-[#ebe4d5] text-gray-700"
                            value={schedule}
                            onChange={(e) => setSchedule(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="event-sponsors" className="block text-gray-700 mb-2">
                            Sponsors
                        </label>
                        <textarea
                            id="event-sponsors"
                            rows="2"
                            placeholder="Enter sponsor names"
                            className="w-full p-2 border border-amber-300 rounded bg-[#ebe4d5] text-gray-700"
                            value={sponsors}
                            onChange={(e) => setSponsors(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="event-tags" className="block text-gray-700 mb-2">
                            Tag
                        </label>
                        <select
                            id="event-tag"
                            className="w-full p-2 bg-[#ebe4d5] border border-custom-brown rounded bg-custom-beige text-gray-700"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        >
                            <option value="">Select a tag</option>
                            <option value="social">Social</option>
                            <option value="career">Career</option>
                            <option value="get-together">Get-together</option>
                        </select>
                    </div>

                    <div className="mb-6 text-center">
                        <a href="#" className="text-gray-700 hover:underline">
                            Register for the event
                        </a>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#d4b992] text-[#483312] py-2 px-4 rounded hover:bg-[#9d7538] transition duration-300"
                        >
                            Save Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}