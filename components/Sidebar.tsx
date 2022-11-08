import Link from "next/link"
import React from "react"
import { TbLayoutDashboard, TbClipboardText } from "react-icons/tb"
import { HiOutlineCalendar } from "react-icons/hi"
import { BiMessageRounded } from "react-icons/bi"
import { FaUserGraduate } from "react-icons/fa"
import { useRouter } from "next/router"

const links = [
	{
		name: "dashboard",
		icon: <TbLayoutDashboard />
	},
	{
		name: "curriculum",
		icon: <TbClipboardText />
	},
	{
		name: "students",
		icon: <FaUserGraduate />
	},
	{
		name: "calendar",
		icon: <HiOutlineCalendar />
	},
	{
		name: "messages",
		icon: <BiMessageRounded />
	}
]

const Sidebar = () => {
	const router = useRouter()
	return (
		<div className='md:overflow-hidden overflow-auto h-full md:hover:overflow-auto pb-10'>
			<>
				<div className=''>
					{links.map((link) => (
						<div key={link.name} className='mb-4'>
							<Link href={`${link.name}`}>
								<div
									className={
										router?.pathname.includes(`/${link.name}`)
											? "flex items-center gap-5 pl-8 py-5 bg-[#E5E5E5] rounded-l-[28px] cursor-pointer"
											: "flex items-center gap-5 pl-8 py-5 text-gray-600 hover:bg-[#f3f3f3] rounded-l-[28px] cursor-pointer"
									}>
									<span className='text-xl'>{link.icon}</span>
									<span className='capitalize font-semibold text-md'>{link.name}</span>
								</div>
							</Link>
						</div>
					))}
				</div>
			</>
		</div>
	)
}

export default Sidebar