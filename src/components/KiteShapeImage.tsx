import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import Svg, { Polygon, ClipPath, Defs } from 'react-native-svg';
import MaskedView from '@react-native-masked-view/masked-view';

interface TrapezoidTriangleImageProps {
  source: ImageSourcePropType;
  size: number;
  position: 'topLeft' | 'topRight' | 'bottomLeft';
}

const TrapezoidTriangleImage: React.FC<TrapezoidTriangleImageProps> = ({ source, size, position }) => {
  // Define the points for the trapezoid shape based on the position
  let points = '';
  switch (position) {
    case 'topLeft':
      // Points for top-left trapezoid like triangle
      points = `${size / 3},0 0,${size} ${size},${size}`;
      break;
    case 'topRight':
      // Points for top-right trapezoid like triangle
      points = `0,0 ${size},0 ${size * 2 / 3},${size}`;
      break;
    case 'bottomLeft':
      // Points for bottom-left trapezoid like triangle
      points = `${size},0 0,0 ${size / 3},${size}`;
      break;
  }

  return (
    <MaskedView
      style={{ width: size, height: size }}
      maskElement={
        <Svg height={size} width={size}>
          <Defs>
            <ClipPath id="clip">
              <Polygon points={points} />
            </ClipPath>
          </Defs>
          <Polygon points={points} fill="white" />
        </Svg>
      }
    >
      <Image source={source} style={{ width: size, height: size }} resizeMode="cover" />
    </MaskedView>
  );
};
export default TrapezoidTriangleImage;