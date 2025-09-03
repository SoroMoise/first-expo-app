import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/themedText'
import { View, ViewStyle } from 'react-native'

interface Props {
  name: keyof (typeof Colors)['type']
}

export function PokemonType({ name }: Readonly<Props>) {
  return (
    <View style={[rootStyles, { backgroundColor: Colors.type[name] }]}>
      <ThemedText color="grayWhite" variant="subtitle3" style={{ textTransform: 'capitalize' }}>
        {name}
      </ThemedText>
    </View>
  )
}

const rootStyles = {
  flex: 0,
  paddingVertical: 2,
  paddingHorizontal: 8,
  borderRadius: 8,
} satisfies ViewStyle
