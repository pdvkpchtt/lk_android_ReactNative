import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
export const GeneralScheduleCalendarIcon = ({ fill, pressed }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: -6 }}
    >
      <Path
        d="M20 3H19V2C19 1.45 18.55 1 18 1C17.45 1 17 1.45 17 2V3H7V2C7 1.45 6.55 1 6 1C5.45 1 5 1.45 5 2V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3ZM19 21H5C4.45 21 4 20.55 4 20V8H20V20C20 20.55 19.55 21 19 21Z"
        fill={
          pressed
            ? isTheme == 'theme_usual' || isTheme.includes('_dark') || isTheme == 'theme_ftt'
              ? '#B0B0B0'
              : '#e4e4e4'
            : isTheme.includes('theme_usual')
            ? isTheme.includes('_dark')
              ? '#dddddd'
              : '#5F5F5F'
            : '#fff'
        }
      />
    </Svg>
  )
}
export default GeneralScheduleCalendarIcon
