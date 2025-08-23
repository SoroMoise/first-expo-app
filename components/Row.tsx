import { View, ViewProps, ViewStyle } from 'react-native'

type Props = ViewProps & {
  gap?: number
}

export function Row({ style, gap, ...rest }: Props) {
  return <View style={[styles, style, gap ? { gap } : undefined]} {...rest} />
}

const styles = { flex: 0, flexDirection: 'row', alignItems: 'center' } satisfies ViewStyle
