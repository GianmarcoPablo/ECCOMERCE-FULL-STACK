import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <h1 className="text-center text-4xl my-5 font-bold text-orange-600 uppercase">Welcome to the Shop</h1>
            <div className="flex container mx-auto justify-evenly">
                <Link
                    className="bg-green-600 hover:bg-green-500 transition-colors text-white w-36 text-center font-bold uppercase py-2 rounded-lg">
                    <p>Shoes</p>
                </Link>
                <Link className="bg-rose-600  hover:bg-rose-500 transition-colors text-white w-36 text-center font-bold uppercase py-2 rounded-lg">
                    <p>Shirts</p>
                </Link>
                <Link className="bg-blue-600  hover:bg-blue-500 transition-colors text-white w-36 text-center font-bold uppercase py-2 rounded-lg">
                    <p>Pants</p>
                </Link>
                <Link className="bg-yellow-600  hover:bg-yellow-500 transition-colors text-white w-36 text-center font-bold uppercase py-2 rounded-lg">
                    <p>Accessories</p>
                </Link>
            </div>
        </>
    )
}
