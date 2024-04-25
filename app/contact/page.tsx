'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Contact = () => {

    type ModalProps = {
        isOpen: boolean;
        message: {
            sucessMessage: string;
            name: string;
            email: string;
            message: string;
        };
        onClose: any;
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState(Object);

    const ContactList = () => {
        return (
            <div className='w-full max-w-96 p-5 flex justify-evenly items-center m-5'>
                <Link href="mailto:baekjinho0522@gmail.com" target="_blank">
                    <Image
                        src="/contact/Email.png"
                        width={30}
                        height={30}
                        alt="email logo"
                        className="cursor-pointer"
                    />
                </Link>
                <Link href="tel:+1-778-957-0235" target="_blank">
                    <Image
                        src="/contact/Phone.png"
                        width={30}
                        height={30}
                        alt="phone logo"
                        className="cursor-pointer"
                    />
                </Link>
                <Link href="https://www.instagram.com/bayden_jaek/" target="_blank">
                    <Image
                        src="/contact/Instagram.png"
                        width={30}
                        height={30}
                        alt="github logo"
                        className="cursor-pointer"
                    />
                </Link>
                <Link href="https://www.linkedin.com/in/jayden-baek-01812823a/" target="_blank">
                    <Image
                        src="/contact/LinkedIn.png"
                        width={30}
                        height={30}
                        alt="linkedin logo"
                        className="cursor-pointer"
                    />
                </Link>
            </div>
        )
    }

    const Modal = ({ isOpen, message, onClose }: ModalProps) => {
        if (!isOpen) return null;
    
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg md:max-w-xl w-full mx-4 h-auto flex flex-col items-center">
                    <h2 className="text-lg md:text-xl font-bold text-center mb-4">{message.sucessMessage}</h2>
                    <div className='flex flex-col items-center w-full'>
                        <div className='p-5 w-full text-start'>
                            <h3 className="font-semibold">Name</h3>
                            <p>{message.name}</p>
                        </div>
                        <div className='p-5 w-full text-start'>
                            <h3 className="font-semibold">Email</h3>
                            <p>{message.email}</p>
                        </div>
                        <div className='p-5 w-full text-start'>
                            <h3 className="font-semibold">Message</h3>
                            <p className="mb-4">{message.message}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="mt-4 bg-black hover:bg-neutral-500 text-white font-bold py-2 px-6 rounded transition-colors duration-150 ease-in-out">
                        Close
                    </button>
                </div>
            </div>
        );
    };
    

    const handleEmailSend = async (event: any) => {
        event.preventDefault();

        const messageData = {
            name: event.target.name.value,
            email: event.target.email.value,
            message: event.target.message.value
        }

        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });

        const data = await response.json();

        if (data.success) {
            const modalMessage = {
                sucessMessage: 'Email sent successfully!',
                name: messageData.name,
                email: messageData.email,
                message: messageData.message
            }
            setModalMessage(modalMessage);
        } else {
            setModalMessage('Email failed to send.');
        }

        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const ContactEmailForm = () => {
        return (
            <form className="flex flex-col justify-center items-center p-5 w-full" onSubmit={handleEmailSend}>
                <input name="name" className="w-full md:w-1/2 p-2 m-2 border-b-2 border-gray-400" type="text" placeholder="Name or Organization" />
                <input name="email" className="w-full md:w-1/2 p-2 m-2 border-b-2 border-gray-400" type="email" placeholder="Email" />
                <textarea name="message" className="w-full md:w-1/2 p-2 m-2 min-h-40 border-b-2 border-gray-400" placeholder="Message" />
                <button className="w-full md:w-1/2 p-2 m-2 bg-black text-white rounded-lg">Send</button>
            </form>
        );
    }
    return (
        <div className="w-full p-5 flex flex-col justify-center items-center text-pretty">
            <div className="text-4xl p-5">Contact Me</div>
            <ContactList />
            <p className='p-5 m-2'>I&apos;m always open to discussing new opportunities to be part of your visions. Feel free to get in touch!</p>
            <p className='p-2 m-2 text-center'>
                Checkout my <Link href="/contact/Jayden_baek_Resume.pdf" target='_blank' className='underline font-semibold hover:text-neutral-400'>resume</Link> and <Link href="/contact/Jayden_Baek_Cover_Letter.pdf" className='underline font-semibold hover:text-neutral-400' target='_blank'>cover letter</Link>!
            </p>
            <ContactEmailForm />
            <Modal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
        </div>
    );
}

export default Contact;