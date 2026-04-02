/// <reference types="expo/types" />

// NOTE: This file should not be edited
// see https://docs.expo.dev/guides/typescript#changing-typescript for details.

declare module '*.svg' {
  import { ImageSourcePropType } from 'react-native';
  const content: ImageSourcePropType;
  export default content;
}
