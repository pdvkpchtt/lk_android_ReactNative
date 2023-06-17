import { useState } from 'react'
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DefaultButton from './defaultButton'
import capitalize from '../utils/capitalize'
import Divider from './Divider'
import * as Clipboard from 'expo-clipboard'
import LinkButton from './LinkButton'
import ListItem from './ListItem'
import TextMain from './Text/TextMain'
import TextMiddle from './Text/TextMiddle'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'

const ListItemGeneralSchedule = ({ item }) => {
  const isTheme = useThemeStore((state) => state.theme)
  console.log(item)
  const lessonTypeValidator = (type) => {
    switch (type) {
      case 'лекция':
        return {
          lessonType: 'лекция',
          typeColor: SwitchTheme(isTheme).typeColorlec,
          pressedColor: SwitchTheme(isTheme).typeColorlecpressed,
        }
      case 'практика':
        return {
          lessonType: 'практика',
          typeColor: SwitchTheme(isTheme).typeColorprac,
          pressedColor: SwitchTheme(isTheme).typeColorpracpressed,
        }
      case 'лабораторная':
        return {
          lessonType: 'лабораторная',
          typeColor: SwitchTheme(isTheme).typeColorlab,
          pressedColor: SwitchTheme(isTheme).typeColorlabpressed,
        }
      case 'зачет':
        return {
          lessonType: 'зачет',
          typeColor: SwitchTheme(isTheme).typeColorzach,
          pressedColor: SwitchTheme(isTheme).typeColorzachpressed,
        }
      case 'экзамен':
        return {
          lessonType: 'экзамен',
          typeColor: SwitchTheme(isTheme).typeColorekz,
          pressedColor: SwitchTheme(isTheme).typeColorekzpressed,
        }
      case 'консультация':
        return {
          lessonType: 'консультация',
          typeColor: SwitchTheme(isTheme).typeColorkons,
          pressedColor: SwitchTheme(isTheme).typeColorkonspressed,
        }
      default:
        return {
          lessonType: 'прочее',
          typeColor: SwitchTheme(isTheme).typeColorproch,
          pressedColor: SwitchTheme(isTheme).typeColorprochpressed,
        }
    }
  }

  const validateAuditoriumAndTeacherName = (item) => {
    let value = ''

    if (item.teacher_name) {
      value = item.teacher_name
    }

    if (item.auditorium) {
      value = item.auditorium
    }
    if (item.gruppaForTeacher) {
      value = item.gruppaForTeacher
    }
    if (item.gruppaForTeacher && item.teacher_name) {
      value = item.teacher_name + ' ‧ ' + item.gruppaForTeacher
    }
    if (item.auditorium && item.teacher_name) {
      value = item.auditorium + ' ‧ ' + item.teacher_name
    }
    if (item.auditorium && item.gruppaForTeacher) {
      value = item.auditorium + ' ‧ ' + item.gruppaForTeacher
    }
    return value
  }

  const { lessonType, typeColor, pressedColor } = lessonTypeValidator(item.type)
  // console.log(item.type)

  const lessonsValidator = (item) => {
    if (item.length === 1) {
      return (
        <>
          {/* Добавить время */}
          {item[0].discipline_name.length > 2 ? <TextMain secondary>{item[0].discipline_name}</TextMain> : null}
          {item[0].podgruppa ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                  {item[0].podgruppa + ' подгруппа'}
                </TextMiddle>
              </View>
            </View>
          ) : null}
          <View style={styles.rows1_type_subject}>
            <View style={styles.rows2_type_subject}>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].paraclockid + ' ' + lessonTypeValidator(item[0].type).lessonType + ' \u00B7 '}
              </TextMiddle>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].start_time + ' – ' + item[0].end_time}
              </TextMiddle>
            </View>
          </View>
          <View style={styles.rows1_type_pair}>
            <View style={styles.rows2_type_pair}>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>{validateAuditoriumAndTeacherName(item[0])}</TextMiddle>
            </View>
            <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
          </View>
        </>
      )
    }

    if (item.length === 2 && item[0].discipline_name === item[1].discipline_name && item[0].type === item[1].type) {
      return (
        <>
          {/* Добавить время */}
          {item[0].discipline_name.length > 2 ? <TextMain secondary>{item[0].discipline_name}</TextMain> : null}
          {item[0].podgruppa ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                  {item[0].podgruppa + ' подгруппа'}
                </TextMiddle>
              </View>
            </View>
          ) : null}

          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>{validateAuditoriumAndTeacherName(item[0])}</TextMiddle>
            </View>
            <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
          </View>

          <View style={styles.dividertop}>
            <Divider />
          </View>
          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].paraclockid + ' ' + lessonTypeValidator(item[0].type).lessonType + ' \u00B7 '}
              </TextMiddle>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].start_time + ' – ' + item[0].end_time}
              </TextMiddle>
            </View>
          </View>

          {/* 2 подгруппа  */}
          <View style={styles.dividerbottom}>
            <Divider />
          </View>

          {/* 2 подгруппа  */}

          <>
            {item[1].podgruppa ? (
              <View style={styles.rows1}>
                <View style={styles.rows2}>
                  <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                    {item[1].podgruppa + ' подгруппа'}
                  </TextMiddle>
                </View>
              </View>
            ) : null}
            <View style={styles.rows1_type_pair}>
              <View style={styles.rows2_type_pair}>
                <TextMiddle color={SwitchTheme(isTheme).textSec}>
                  {validateAuditoriumAndTeacherName(item[1])}
                </TextMiddle>
              </View>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
            </View>
          </>
        </>
      )
    }

    if (item.length === 2 && item[0].type === item[1].type) {
      return (
        <>
          {/* Добавить время */}
          {item[0].discipline_name.length > 2 ? <TextMain secondary>{item[0].discipline_name}</TextMain> : null}
          {item[0].podgruppa ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                  {item[0].podgruppa + ' подгруппа'}
                </TextMiddle>
              </View>
            </View>
          ) : null}

          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>{validateAuditoriumAndTeacherName(item[0])}</TextMiddle>
            </View>
            <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
          </View>

          <View style={styles.dividertop}>
            <Divider />
          </View>
          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].paraclockid + ' ' + lessonTypeValidator(item[0].type).lessonType + ' \u00B7 '}
              </TextMiddle>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].start_time + ' – ' + item[0].end_time}
              </TextMiddle>
            </View>
          </View>

          {/* 2 подгруппа  */}

          <>
            <View style={styles.dividerbottom}>
              <Divider />
            </View>
            {item[1].discipline_name.length > 2 ? <TextMain secondary>{item[1].discipline_name}</TextMain> : null}
            {item[1].podgruppa ? (
              <View style={styles.rows1}>
                <View style={styles.rows2}>
                  <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                    {item[1].podgruppa + ' подгруппа'}
                  </TextMiddle>
                </View>
              </View>
            ) : null}
            <View style={styles.rows1_type_pair}>
              <View style={styles.rows2_type_pair}>
                <TextMiddle color={SwitchTheme(isTheme).textSec}>
                  {validateAuditoriumAndTeacherName(item[1])}
                </TextMiddle>
              </View>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
            </View>
          </>
        </>
      )
    }

    if (item.length > 2 || (item.length === 2 && item[0].type !== item[1].type)) {
      return item.map((lesson, index) => (
        <>
          {lesson.discipline_name.length > 2 ? <TextMain secondary>{lesson.discipline_name}</TextMain> : null}
          {lesson.podgruppa ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                  {lesson.podgruppa + ' подгруппа'}
                </TextMiddle>
              </View>
            </View>
          ) : null}
          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle secondary color={lessonTypeValidator(lesson.type).typeColor}>
                {lesson.paraclockid + ' ' + lessonTypeValidator(lesson.type).lessonType + ' \u00B7 '}
              </TextMiddle>
              <TextMiddle secondary color={lessonTypeValidator(lesson.type).typeColor}>
                {lesson.start_time + ' – ' + lesson.end_time}
              </TextMiddle>
            </View>
          </View>
          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>{validateAuditoriumAndTeacherName(lesson)}</TextMiddle>
            </View>
            <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
          </View>

          {index !== item.length - 1 ? (
            <View style={styles.dividertop}>
              <Divider />
            </View>
          ) : null}
        </>
      ))
    }
  }

  return (
    <View
      style={{
        backgroundColor: SwitchTheme(isTheme).bgItem,
        borderRadius: 20,
        paddingHorizontal: 12,
        marginTop: 0,
        paddingVertical: 12,
      }}
    >
      {lessonsValidator(item)}
    </View>
  )
}

const styles = StyleSheet.create({
  rows1: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rows2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rows1_type_subject: {
    marginTop: 4,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rows2_type_subject: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rows1_type_pair: {
    marginTop: 2,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rows2_type_pair: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  dividertop: {
    paddingVertical: 11,
  },

  dividerbottom: {
    // paddingVertical: 11,
    paddingTop: 11,
    paddingBottom: 7,
  },
})

export default ListItemGeneralSchedule
