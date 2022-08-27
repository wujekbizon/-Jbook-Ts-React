import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let initialized = false;

export const codeProcessor = async (rawCode: string) => {
  if (!initialized) {
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.15.5/esbuild.wasm',
      });
      initialized = true;
    } catch (err) {
      console.error(err);
    }
  }

  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    });
    return {
      code: result.outputFiles[0].text,
      err: '',
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: '',
        err: err.message,
      };
    } else {
      throw err;
    }
  }
};

export default codeProcessor;
