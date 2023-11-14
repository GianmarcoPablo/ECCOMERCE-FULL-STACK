
export default function AuthLayout({ children, title = "" }) {
    return (
        <div className='bg-neutral-900 text-white'>
            <div className='container mx-auto'>
                <div className='flex justify-center items-center min-h-screen'>
                    <div className='w-full max-w-md p-5 md:p-0'>
                        <div className='text-center'>
                            <h1 className='text-5xl text-white font-bold'>{title}</h1>
                        </div>
                        <div className='mt-7'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
