import { View, Text, StyleSheet, ViewProps, ImageSourcePropType, Image } from 'react-native'
import { Row } from '../Row'
import { ThemedText } from '../themedText'

type Props = ViewProps & {
  title?: string
  description?: string
  image?: ImageSourcePropType
}

export function PokemonSpec({ style, title, description, image, ...rest }: Readonly<Props>) {
  return (
    <View style={[styles.root, style]} {...rest}>
      <Row>
        {image && <Image source={image} style={{ width: 16, height: 16 }}></Image>}
        <ThemedText>{title}</ThemedText>
      </Row>
      <ThemedText variant="caption" color="grayMedium">
        {description}
      </ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 4,
    alignItems: 'center',
  },
})
