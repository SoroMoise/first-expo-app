import { useThemeColors } from '@/hooks/useThemeColors'
import { StyleSheet, View } from 'react-native'

type Props = {
  checked: boolean
}

export function Radio({ checked }: Readonly<Props>) {
  const colors = useThemeColors()

  return (
    <View style={[styles.radio, { borderColor: colors.tint }]}>
      {checked && <View style={[styles.radioInner, { backgroundColor: colors.tint }]}></View>}
    </View>
  )
}

const styles = StyleSheet.create({
  radio: {
    width: 14,
    height: 14,
    borderRadius: 14,
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 6,
  },
})
