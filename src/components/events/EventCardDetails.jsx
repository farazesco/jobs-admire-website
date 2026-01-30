import { useState } from 'react'
import { RiTimeFill } from 'react-icons/ri'
import { LuDot } from 'react-icons/lu'
import { Typography } from 'antd'
import moment from 'moment'
import EventTimeline from './EventTimeline'

const pricesParams = {
  priceIncludes: {
    title: 'Price includes',
    color: '#5cbf54',
    colorWithOpacity: '#5cbf5433'
  },
  priceNotIncludes: {
    title: 'Price not includes',
    color: '#f44336',
    colorWithOpacity: '#f4433633'
  }
}

const OverviewTab = ({ timeline }) => {
  return (
    <div className="w-full h-full overflow-auto">
      <EventTimeline timeline={timeline} />
    </div>
  )
}

const DetailsTab = ({ details }) => {
  return (
    <div className="w-full">
      <Typography.Text>
        {details}
      </Typography.Text>
    </div>
  )
}

const EventCardDetails = ({ event }) => {
  const [mainTab, setMainTab] = useState('overview')
  const [priceTab, setPriceTab] = useState('priceIncludes')
  
  const tabs = {
    overview: <OverviewTab timeline={event.timeline} />,
    details: <DetailsTab details={event.details} />
  }
  
  return (
    <div className="w-full rounded-2xl shadow-md overflow-hidden">
      <div className="flex max-md:flex-col justify-between max-md:space-y-5 md:h-24 p-5 md:px-10 bg-primary text-secondary">
        <div className="flex flex-col">
          <Typography.Text className="text-inherit">
            Flight Details
          </Typography.Text>
          <Typography.Text className="text-inherit text-[20px] font-bold uppercase">
            {event.flightDetails.departureAirport} to {event.flightDetails.arrivalAirport}
          </Typography.Text>
        </div>
        <div className="flex flex-col md:items-end">
          <Typography.Text className="text-inherit">
            Fair Price/Participant
          </Typography.Text>
          <Typography.Text className="text-inherit text-[20px] font-bold">
            {event.fairPrice}
          </Typography.Text>
        </div>
      </div>
      <div className="flex max-lg:flex-col w-full lg:max-h-[450px] py-5 pr-5">
        <div className="flex flex-col flex-1 md:h-full overflow-x-auto">
          <div className="w-full px-10 pt-5 space-x-5 border-b">
            {
              Object.keys(tabs).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setMainTab(tab)}
                >
                  <Typography.Text className={`capitalize text-[16px] transition-all ${
                    mainTab === tab && 'text-primary font-bold'
                  }`}>
                    {tab}
                  </Typography.Text>
                </button>
              ))
            }
          </div>
          <div className="flex-1 px-5 py-10 md:px-10 lg:pb-5">
            {tabs[mainTab]}
          </div>
        </div>
        <div className="px-5 md:pb-10 space-y-5 lg:border-l max-lg:mx-auto">
          <div
            className="flex flex-col w-80 h-64 border-2 rounded-2xl overflow-hidden"
            style={{ borderColor: pricesParams[priceTab].color }}
          >
            <div
              className="flex w-full h-12 border-b"
              style={{ borderBottomColor: pricesParams[priceTab].colorWithOpacity }}
            >
              {
                Object.keys(pricesParams).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPriceTab(key)}
                    className={`flex-1 h-full ${
                      priceTab === key ? `text-secondary` : 'bg-secondary'
                    }`}
                    style={priceTab === key ? { backgroundColor: pricesParams[key].color } : {}}
                  >
                    <Typography.Text
                      type={priceTab === key ? 'primary' : 'secondary'}
                      className="text-inherit capitalize font-bold"
                    >
                      {pricesParams[key].title}
                    </Typography.Text>
                  </button>
                ))
              }
            </div>
            <ul className="w-full h-52 overflow-x-hidden overflow-y-auto">
              {
                event[priceTab].map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-x-2.5 h-10 pl-2.5 bg-opacity-20"
                    style={{
                      color: pricesParams[priceTab].color,
                      backgroundColor: index % 2 === 1 ? pricesParams[priceTab].colorWithOpacity : 'transparent'
                  }}
                  >
                    <LuDot className="w-5 h-5"/>
                    <Typography.Text className="text-inherit font-semibold">
                      {item}
                    </Typography.Text>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2.5 w-80 h-20 px-10 rounded-2xl bg-primary text-secondary">
            <RiTimeFill className="w-10 h-10"/>
            <div className="flex flex-col">
              <Typography.Text className="text-inherit">
                Last date of application is
              </Typography.Text>
              <Typography.Text className="text-inherit text-[20px] font-bold uppercase">
                {moment(event.applicationDeadline).format('DD MMM YYYY')}
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCardDetails
