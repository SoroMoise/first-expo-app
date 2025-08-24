import { useRef, useState } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'
import { Dimensions, Image, Modal, Pressable, StyleSheet, View } from 'react-native'
import { Shadows } from '@/constants/Schadows'
import { ThemedText } from './themedText'
import { Card } from './Card'
import { Row } from './Row'
import { Radio } from '@/components/Radio'

type Props = {
  value: 'id' | 'name'
  onChange: (value: 'id' | 'name') => void
}

const options = [
  { label: 'Number', value: 'id' },
  { label: 'Name', value: 'name' },
] as const

export function SortButton({ value, onChange }: Readonly<Props>) {
  const theme = useThemeColors()
  const buttonRef = useRef<View>(null)
  const [position, setPosition] = useState<null | { top: number; left: number }>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const iconSource =
    value === 'id' ? require('@/assets/images/icons/number.png') : require('@/assets/images/icons/alpha.png')

  const onSortButtonPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      const screenWidth = Dimensions.get('window').width
      const modalWidth = 113

      setPosition({
        top: y + height,
        left: screenWidth - modalWidth - 5,
      })

      setIsModalVisible(true)
    })
  }

  const onClose = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Pressable onPress={onSortButtonPress} android_ripple={{ color: theme.tint, foreground: true }}>
        <View ref={buttonRef} style={[styles.container, { backgroundColor: theme.grayWhite }]}>
          <Image source={iconSource} width={24} height={24} />
        </View>
      </Pressable>
      <Modal animationType="fade" transparent visible={isModalVisible} onRequestClose={onClose}>
        <Pressable style={styles.backdrop} onPress={onClose}>
          <View style={[styles.popup, { backgroundColor: theme.tint, ...position }]}>
            <ThemedText style={styles.title} variant="subtitle2" color="grayWhite">
              Sort by :
            </ThemedText>
            <Card style={styles.card}>
              {options.map((o) => (
                <Pressable key={o.value} onPress={() => onChange(o.value)}>
                  <Row gap={8}>
                    <Radio checked={o.value === value}></Radio>
                    <ThemedText>{o.label}</ThemedText>
                  </Row>
                </Pressable>
              ))}
            </Card>
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  popup: {
    position: 'absolute',
    width: 113,
    padding: 4,
    paddingTop: 16,
    gap: 16,
    borderRadius: 12,
    ...Shadows.dp2,
  },
  title: {
    paddingLeft: 20,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
})
