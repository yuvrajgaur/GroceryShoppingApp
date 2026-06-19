import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext'
import axios from "axios";

const Contact=()=>{

    const {navigate}=useAppContext();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() && !message.trim()) {
            toast.error("Email and Message field are empty");
            return;
        }

        if (!message.trim()) {
            toast.error("Message field is empty");
            return;
        }

        if (!email.trim()) {
            toast.error("Email field is empty");
            return;
        }

        
        try {
        const { data } = await axios.post('/api/mail/contact', {email, message});

        if (data.success) {
            navigate("/");
            toast.success("Thanks for contacting us!");
        }

        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="w-full py-20 px-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-275 flex flex-col md:flex-row gap-6 md:gap-10">
                
                {/* Left Card */}
                <div className="w-full md:w-[50%] bg-primary-dull rounded-[20px] p-6 sm:p-12 relative overflow-hidden flex flex-col">
                    <div className="relative z-10 flex-col flex h-full">
                        <h1 className="text-3xl sm:text-[42px] font-medium text-white mt-3">Have Something in Mind? Let’s Talk</h1>
                        <p className="text-base text-white mt-3">
                            Have a question or need assistance? Our team is here to help you every step of the way.
                        </p>
                        
                        <div className="flex flex-col gap-4 mt-8 sm:mt-12">
                            <div className="flex items-center gap-2">
                                <div className="size-9 bg-primary rounded-full flex items-center justify-center shrink-0">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.667 4.664 8.673 8.482a1.33 1.33 0 0 1-1.34 0l-6-3.818" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.333 2.664H2.667c-.737 0-1.334.597-1.334 1.333v8c0 .737.597 1.334 1.334 1.334h10.666c.737 0 1.334-.597 1.334-1.334v-8c0-.736-.597-1.333-1.334-1.333" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span className="text-white text-sm">gogrocery.customercare@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-9 bg-primary rounded-full flex items-center justify-center shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.874 12.926a.75.75 0 0 0 .91-.227l.266-.349a1.5 1.5 0 0 1 1.2-.6h2.25a1.5 1.5 0 0 1 1.5 1.5v2.25a1.5 1.5 0 0 1-1.5 1.5A13.5 13.5 0 0 1 4 3.5 1.5 1.5 0 0 1 5.5 2h2.25a1.5 1.5 0 0 1 1.5 1.5v2.25a1.5 1.5 0 0 1-.6 1.2l-.351.263a.75.75 0 0 0-.219.925 10.5 10.5 0 0 0 4.794 4.788" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span className="text-white text-sm">+91-9977643213</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-9 bg-primary rounded-full flex items-center justify-center shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6667 8.33073C16.6667 12.4916 12.0508 16.8249 10.5008 18.1632C10.3564 18.2718 10.1807 18.3305 9.99999 18.3305C9.81933 18.3305 9.64356 18.2718 9.49916 18.1632C7.94916 16.8249 3.33333 12.4916 3.33333 8.33073C3.33333 6.56262 4.03571 4.86693 5.28595 3.61668C6.53619 2.36644 8.23188 1.66406 9.99999 1.66406C11.7681 1.66406 13.4638 2.36644 14.714 3.61668C15.9643 4.86693 16.6667 6.56262 16.6667 8.33073Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 10.8359C11.3807 10.8359 12.5 9.71665 12.5 8.33594C12.5 6.95523 11.3807 5.83594 10 5.83594C8.61929 5.83594 7.5 6.95523 7.5 8.33594C7.5 9.71665 8.61929 10.8359 10 10.8359Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <span className="text-white text-sm">Maulana Azad National Institute of Technology, Bhopal</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-6 right-12 font-semibold text-[128px] text-primary leading-none select-none pointer-events-none">
                        talk
                    </div>
                </div>

                {/*Right Card Form*/}
                <form
                    onSubmit={handleSubmit}
                    className="w-full md:w-[50%] bg-white border border-zinc-200 rounded-[20px] p-6 md:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                >
                    <h2 className="text-2xl md:text-[28px] font-medium text-zinc-800 mb-6">
                        Contact us
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4 md:mb-8 text-sm">
                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-700">First name</label>
                            <input
                                type="text"
                                placeholder="First name"
                                className="px-4 py-3 rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-500 text-zinc-900 focus:outline-none focus:border-zinc-300 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-zinc-700">Last name</label>
                            <input
                                type="text"
                                placeholder="Last name"
                                className="px-4 py-3 rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-500 text-zinc-900 focus:outline-none focus:border-zinc-300 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-4 md:mb-8 text-sm">
                        <label className="text-zinc-700">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="px-4 py-3 rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-500 text-zinc-900 focus:outline-none focus:border-zinc-300 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mb-3 text-sm">
                        <label className="text-zinc-700">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                            rows="4"
                            className="px-4 py-3 rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-500 text-zinc-900 focus:outline-none focus:border-zinc-300 transition-colors resize-none"
                        ></textarea>
                    </div>

                    <div className="flex items-center gap-2 mb-8 md:mb-14"></div>

                    <button
                        type="submit"
                        className="w-full bg-zinc-950 text-white hover:bg-zinc-900 text-sm py-3.5 rounded-full transition-colors cursor-pointer"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Contact