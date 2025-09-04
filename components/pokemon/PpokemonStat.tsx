import { StyleSheet, View, ViewProps } from 'react-native'
import { Row } from '../Row'
import { ThemedText } from '../themedText'
import { useThemeColors } from '@/hooks/useThemeColors'

type Props = ViewProps & {
  name: string
  value: number
  color: string
}

export function PokemonStat({ style, name, value, color, ...props }: Props) {
  const colors = useThemeColors()

  function statShortName(name: string) {
    return name
      .replaceAll('special-', 'S')
      .replaceAll('-', '')
      .replaceAll('attack', 'ATK')
      .replaceAll('defense', 'DEF')
      .replaceAll('speed', 'SPD')
      .toUpperCase()
  }

  return (
    <Row style={[styles.rooot, style]} {...props}>
      <View style={[styles.name, { borderColor: colors.grayLight }]}>
        <ThemedText variant="subtitle3" style={{ color }}>
          {statShortName(name)}
        </ThemedText>
      </View>
      <View style={styles.number}>
        <ThemedText>{value.toString().padStart(3, '0')}</ThemedText>
      </View>
      <Row style={styles.bar}>
        <View style={[styles.barInner, { flex: value, backgroundColor: color }]} />
        <View style={[styles.barBckground, { flex: 255 - value, backgroundColor: color }]} />
      </Row>
    </Row>
  )
}

const styles = StyleSheet.create({
  rooot: {},
  name: {
    width: 35,
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  number: {
    width: 25,
    paddingLeft: 8,
  },
  bar: {
    flex: 1,
    height: 4,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 8,
  },
  barInner: {
    height: 4,
  },
  barBckground: {
    height: 4,
    opacity: 0.2,
  },
})
