import { ViewProps, View, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColors } from '@/hooks/useThemeColors'

type Props = ViewProps

export function RootView({ style, ...rest }: Readonly<Props>) {
  const colors = useThemeColors()

  return <SafeAreaView style={[rootStyles, { backgroundColor: colors.tint }]} {...rest} />
}

const rootStyles = { flex: 1, padding: 4 } satisfies ViewStyle
