# LottieWeb Component Documentation

The `LottieWeb` component is a lightweight Lottie animation player that supports compressed animation data (zlib format).

## Installation

### Dependencies

Before using the component, ensure the following packages are installed in your project:

- `fflate` (for decompression of zlib-compressed data)
- `lottie-web`

You can install these dependencies via npm or yarn:

```bash
npm install fflate lottie-web
# or
yarn add fflate lottie-web
```

## Usage

### Importing the Component

```tsx
import LottieWeb from './LottieWeb';
```

### Props

The `LottieWeb` component accepts the following props:

| Prop           | Type        | Default   | Description                                                    |
|----------------|-------------|-----------|----------------------------------------------------------------|
| `animationData`| `Uint8Array`| Required  | Compressed animation data in zlib format.                     |
| `loop`         | `boolean`   | `true`    | Determines whether the animation should loop.                 |
| `autoplay`     | `boolean`   | `true`    | Determines whether the animation should autoplay.             |
| `size`         | `number`    | `100`     | The width and height of the animation container in pixels.    |

### Example

Here is an example of how to use the `LottieWeb` component:

```tsx
import React from 'react';
import LottieWeb from './LottieWeb';
import MyBestZLottie from "myBestZlottie.zlottie"

const App = () => {
  return (
    <div>
      <h1>Lottie Animation Example</h1>
      <LottieWeb
        animationData={MyBestZLottie}
        loop={true}
        autoplay={true}
        size={200}
      />
    </div>
  );
};

export default App;
```

### Parse **.zlottie** to Uint8Array
In the component, you will see that I am passing a `Uint8Array`. To accept '.zlottie' in animationData, you need to get it in string format, download it, and format it in `Uint8Array`. Here is the code that has been tested in projects!
```tsx
const response = await fetch(props.animationData)
const arrayBuffer = await response.arrayBuffer()
const compressedData = new Uint8Array(arrayBuffer)
```
There will be a hint in the `LottieWeb` code where to put it.

The `compressedData` will already contain what needs to be passed on to be decompressed into `fflate`! I hope it wasn't difficult!

> Alternatively, you can throw this in every place where you use `lottie`, and then leave the `Uint8Array` type in `animationData`. But why ?

### Decompression Notes

The `LottieWeb` component internally decompresses the provided `Uint8Array` animation data using the `fflate` library. Ensure that your animation data is correctly compressed using zlib before passing it to the component.

## Component Structure

The `LottieWeb` component uses the `lottie-web` library to render animations. The animation is rendered into a `div` container referenced by the `refContainer` variable. The component supports clean-up using the `useEffect` hook to destroy the animation when the component is unmounted.

### Key Features

- Supports zlib-compressed animation data.
- Optimized for lightweight rendering with the `lottie_light` player.
- Customizable playback behavior with `loop` and `autoplay` options.
- Adjustable container size with the `size` prop.

## Troubleshooting

1. **Animation not displaying**:
   - Ensure the `animationData` prop contains valid zlib-compressed data.
   - Check your browser's developer console for errors.

2. **Animation is static**:
   - Verify the `autoplay` prop is set to `true`.
   - Ensure the `loop` prop is correctly configured.

## Contributing

Feel free to contribute to the `LottieWeb` component by improving its functionality or fixing issues. For any suggestions or issues, open a GitHub pull request or issue in the repository.
