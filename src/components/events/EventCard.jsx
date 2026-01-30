import { Collapse } from 'react-collapse'
import { RiMapPin2Fill, RiArrowDownSLine } from 'react-icons/ri'
import Image from 'next/image'
import { Typography } from 'antd'
import { useToggleVisibility } from '@lib/hooks/'
import { PrimaryButton } from '@components/core/buttons'
import EventCardDetails from './EventCardDetails'

const EventCard = ({ event }) => {
  const { ref, isVisible, toggleIsVisible } = useToggleVisibility(false)
  
  return (
    <div
      ref={ref}
      className="w-full space-y-2.5"
    >
      <div
        onClick={toggleIsVisible}
        className="flex max-md:flex-col w-full max-w-[1500px] md:h-52 rounded-xl md:rounded-2xl shadow-md cursor-pointer overflow-hidden"
      >
        <div className="flex flex-col justify-center items-center gap-0 w-full md:w-64 max-md:py-2.5 bg-primary text-secondary">
          <Typography.Title className="!text-inherit !text-[48px] !font-bold">
            {event.startDay} - {event.endDay}
          </Typography.Title>
          <Typography.Title className="!text-inherit !text-[32px] !font-normal">
            {event.month}
          </Typography.Title>
        </div>
        <div className="relative w-full max-md:h-80 md:flex-1 md:h-full">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b md:bg-gradient-to-r from-white from-50% md:from-40%">
            <div className="-z-10 relative w-full md:w-3/5 max-md:aspect-video h-full ml-auto">
              <Image
                src="/images/event.png"
                alt={event.title}
                quality="100"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 flex flex-col justify-evenly max-md:gap-y-5 w-full md:w-2/5 md:h-full pl-10 py-2.5 bg-transparent">
            <div>
              <Typography.Title level={2} className="!text-[32px]">
                {event.title}
              </Typography.Title>
              <div className="flex items-center gap-x-1">
                <Typography.Text type="secondary">
                  <RiMapPin2Fill className="w-6 h-6"/>
                </Typography.Text>
                <Typography.Text type="secondary" className="text-[20px] font-medium sm:line-clamp-1 lg:line-clamp-none">
                  {event.location}
                </Typography.Text>
              </div>
            </div>
            <PrimaryButton
              text="Enroll Now"
              className="w-fit"
            />
            <div className="flex items-center gap-x-1">
              <Typography.Text className="font-light">
                More details
              </Typography.Text>
              <Typography.Text>
                <RiArrowDownSLine
                  className={`w-5 h-5 transform transition-all ${isVisible ? '-rotate-180' : 'rotate-0'}`}/>
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>
      <Collapse isOpened={isVisible} className="w-full">
        <EventCardDetails event={event}/>
      </Collapse>
    </div>
  )
}

export default EventCard
