import { Fragment } from 'react'
import { Typography } from 'antd'
import moment from 'moment'

const EventTimeline = ({ timeline }) => {
  return (
    <div className="flex w-full h-full">
      {
        timeline.map((entry, index) => (
          <Fragment key={entry.title}>
            <div className="relative h-full space-y-5">
              <div className="flex items-center">
                <div className="w-[11px] h-[11px] rounded-full border-[3px] border-primary"/>
                {
                  index < timeline.length - 1 && (
                    <hr className="w-56"/>
                  )
                }
              </div>
              <div className="flex flex-col w-52">
                <Typography.Text className="text-[16px] uppercase">
                  {moment(entry.date).format('DD MMM YYYY')}
                </Typography.Text>
                <div className="mb-2.5">
                  <Typography.Title className="!text-[20px] !font-bold uppercase">
                    {entry.title}
                  </Typography.Title>
                  <Typography.Title type="secondary" className="!text-[14px] !font-normal">
                    {entry.location}
                  </Typography.Title>
                </div>
                <ul>
                  {
                    entry.steps.map((step, index) => (
                      <li key={index}>
                        <Typography.Text className="font-semibold text-secondary-dark">
                          {step}
                        </Typography.Text>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </Fragment>
        ))
      }
    </div>
  )
}

export default EventTimeline
