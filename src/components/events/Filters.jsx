import { Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import { SelectInput } from '@components/core/inputs'

const Filters = ({ countryOptions, selectedCountries, onCountrySelect, sortOptions, selectedSort, onSortSelect }) => {
  const { t } = useTranslation('common')
  const isCountrySelected = (country) => selectedCountries.some((selectedCountry) => selectedCountry.value === country.value)
  
  return (
    <div className="flex max-md:flex-col-reverse max-md:gap-5 w-full md:h-28 px-5 md:px-8 py-4 items-center rounded-2xl shadow-md">
      <div className="flex flex-col justify-between max-md:gap-2.5 flex-1 h-full">
        <Typography.Text className="font-medium">
          Upcoming Events Countries
        </Typography.Text>
        <div className="flex gap-4 overflow-hidden">
          {
            countryOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onCountrySelect(option)}
                className={`h-11 px-5 rounded-2xl transition-all ${
                  isCountrySelected(option) ? 'bg-primary text-secondary' : 'border'
                }`}
              >
                <Typography.Text className="!text-inherit text-[16px] font-semibold">
                  {option.label}
                </Typography.Text>
              </button>
            ))
          }
        </div>
      </div>
      <SelectInput
        label="Sort by:"
        placeholder={t("labels.general.selectSortOrder")}
        value={selectedSort}
        onSelect={onSortSelect}
        options={sortOptions}
        labelPlacement="left"
        selectClassName="w-60"
      />
    </div>
  )
}

export default Filters
