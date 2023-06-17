import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const MyWorksIcon = ({ props, color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M9.54245 5.49997V5.87997C8.71245 5.54997 7.82245 5.37997 6.93245 5.37997C5.51245 5.37997 4.09245 5.80997 2.88245 6.66997C2.37245 7.02997 2.31245 7.75997 2.75245 8.19997L5.32245 10.77H6.43245V11.88C7.29245 12.74 8.41245 13.19 9.54245 13.24V15.5H7.54245C6.99245 15.5 6.54245 15.95 6.54245 16.5V18.5C6.54245 19.6 7.44245 20.5 8.54245 20.5H18.5424C20.2024 20.5 21.5424 19.16 21.5424 17.5V5.49997C21.5424 4.94997 21.0924 4.49997 20.5424 4.49997H10.5424C9.99245 4.49997 9.54245 4.94997 9.54245 5.49997ZM8.43245 10.91V8.75997H6.15245L5.11245 7.71997C5.68245 7.49997 6.30245 7.37997 6.93245 7.37997C8.27245 7.37997 9.52245 7.89997 10.4724 8.83997L11.8824 10.25L11.6824 10.45C11.1724 10.96 10.4924 11.25 9.76245 11.25C9.29245 11.25 8.83245 11.13 8.43245 10.91ZM19.5424 17.5C19.5424 18.05 19.0924 18.5 18.5424 18.5C17.9924 18.5 17.5424 18.05 17.5424 17.5V16.5C17.5424 15.95 17.0924 15.5 16.5424 15.5H11.5424V12.91C12.1124 12.68 12.6424 12.34 13.1024 11.88L13.3024 11.68L16.1324 14.5H17.5424V13.09L11.5424 7.11997V6.49997H19.5424V17.5Z"
        fill="#FF6E5B"
      />
    </Svg>
  )
}

export default MyWorksIcon