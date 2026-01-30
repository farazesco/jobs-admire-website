import { RiMapPin2Fill } from 'react-icons/ri'
import Image from 'next/image'
import { Typography } from 'antd'

const CardWithImage = ({ title, location, imageUrl, children }) => {
  return (
    <div className="flex w-full h-full rounded-2xl border overflow-hidden">
      <div className="relative w-5/12 h-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
        />
      </div>
      <div className="flex flex-col justify-between flex-1 h-full p-5">
        <div>
          <Typography.Title level={4} className="!font-bold">
            {title}
          </Typography.Title>
          <div className="flex items-center gap-1">
            <Typography.Text type="secondary">
              <RiMapPin2Fill className="w-4 h-4"/>
            </Typography.Text>
            <Typography.Text type="secondary">
              {location}
            </Typography.Text>
          </div>
        </div>
        <hr className="w-1/2 m-0 text-gray-500"/>
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default CardWithImage
