import { ImageBackground, Pressable, ScrollView, StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native'
import useThemeStore from '../../shared/theme/store/store'
import Layout from '../../shared/ui/Layout'
import ListItemWithSwitch from '../../shared/ui/ListItemWithSwitch'
import TextMain from '../../shared/ui/Text/TextMain'
import TextDisplay from '../../shared/ui/Text/TextDisplay'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import DecorationItem from '../../shared/ui/DecorationItem'
import { useState } from 'react'
import MiniThemes from '../../shared/theme/MiniThemes'
import { useEffect } from 'react'

const Decoration = ({ navigation, route }) => {
  const isTheme = useThemeStore((state) => state.theme)
  // console.log(MiniThemes(isTheme))
  const themes = MiniThemes(isTheme)
  // console.log(themes)
  const IdSelected = useThemeStore((state) => state.dataIdSelected)

  const { setTheme, setSelected, setAuto, isAuto } = useThemeStore((state) => ({
    setTheme: state.setTheme,
    setSelected: state.setSelected,
    setAuto: state.setAuto,
    isAuto: state.isAuto,
  }))

  const [isEnabled, setIsEnabled] = useState(false)
  const [auto, setIsAuto] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
    if (!isAuto) {
      if (isTheme.includes('_dark')) {
        setTheme(isTheme.replace('_dark', ''))
      } else {
        setTheme(isTheme + '_dark')
      }
    }
  }

  const toggleAuto = () => {
    setIsAuto((previousState) => !previousState)
    setAuto(isAuto)
  }

  useEffect(() => {
    // setTheme('theme_usual')
    if (isTheme.includes('_dark')) {
      setIsEnabled(true)
    } else {
      setIsEnabled(false)
    }
  }, [isTheme])

  return (
    <>
      <Layout>
        <View
          style={{
            marginTop: 12,
            backgroundColor: SwitchTheme(isTheme).bgItem,
            paddingVertical: 12,
            borderRadius: 20,
          }}
        >
          <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
            {themes.map((theme, index, arr) => (
              <DecorationItem
                onPress={() => {
                  // if (isTheme.includes('_dark')) {
                  setTheme(theme[0])
                  // } else {
                  //   setTheme(theme[0] + '_dark')
                  // }

                  setSelected(index)
                }}
                isNeedMargin={index === 0 ? 'left' : index === arr.length - 1 ? 'right' : 'middle'}
              >
                {index == IdSelected ? theme[2] : theme[1]}
              </DecorationItem>
            ))}
          </ScrollView>
          <TextMain marginTop={16} paddingHorizontal={16}>
            {SwitchTheme(isTheme).textdecoration}
          </TextMain>
          <TextDisplay color={SwitchTheme(isTheme).textSec} marginTop={3} paddingHorizontal={16}>
            {SwitchTheme(isTheme).textlozungdecoration}
          </TextDisplay>
        </View>
        {/* <View style={{ marginTop: 16, marginBottom: 16 }}>
          <ListItemWithSwitch title="Авто" onValueChange={() => toggleAuto()} value={auto} isSwitch />
        </View>
        {!isAuto ? (
          <View>
            <ListItemWithSwitch title="Ночной режим" onValueChange={() => toggleSwitch()} value={isEnabled} />
          </View>
        ) : null} */}
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: 53,
    height: 98,
  },
})

export default Decoration
