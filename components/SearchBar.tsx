import { Image, TextInput, StyleSheet } from 'react-native'
import { Row } from './Row'
import { useThemeColors } from '@/hooks/useThemeColors'

type Props = {
  value: string
  onChange: (e: string) => void
}

export function SearchBar({ value, onChange }: Readonly<Props>) {
  const colors = useThemeColors()

  return (
    <Row style={[styles.container, { backgroundColor: colors.grayWhite }]}>
      <Image source={require('@/assets/images/icons/search.png')} width={16} height={16} />
      <TextInput value={value} onChangeText={onChange} placeholder="Search" style={[styles.input]} />
    </Row>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    borderRadius: 40,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
  },
})
