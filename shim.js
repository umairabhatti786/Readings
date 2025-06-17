import 'react-native-get-random-values';
import 'node-libs-react-native/globals'; // This sets global.crypto, Buffer, process, etc.
import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;