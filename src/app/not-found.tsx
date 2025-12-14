import Image from 'next/image'
import Link from 'next/link'
import notFoundImg from '@/public/not-found.png' ;

export default function NotFound() {
  return (
    <div className='flex justify-center items-center min-h-screen flex-col bg-gray-100 dark:bg-black'>
        <div className='relative w-3/12'>
            <Image src={notFoundImg} width={200} alt="Not-Found" className='w-full'/>
        </div>
        <h1 className='text-4xl font-bold mb-8'><span className='text-red-500'>404</span> - Page Not Found</h1>
        <h2 className='text-gray-400 text-2xl'>The page you are looking for does not exist</h2>
        <Link href="/" className='hover:bg-blue-700 text-white border bg-blue-600 cursor-pointer p-5 mt-3'>Go to Home</Link>
    </div>
  )
}
