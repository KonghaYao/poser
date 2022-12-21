import solidPlugin from 'vite-plugin-solid';
import visualizer from 'rollup-plugin-visualizer';
export default ({ mode }) => ({
    base: './',
    plugins: [
        solidPlugin(),
        {
            enforce: 'pre',
            resolveId(thisFile) {
                if (thisFile === 'three') {
                    return {
                        id: 'https://cdn.jsdelivr.net/npm/three/build/three.module.min.js',
                        external: true,
                    };
                }
            },
        },
        mode === 'analyze' && (visualizer({ open: true, filename: 'visualizer/stat.html' }) as any),
    ],
    server: {
        //主要是加上这段代码
        host: '127.0.0.1',
        port: 3000,
        proxy: {
            '/props': {
                //实际请求地址
                changeOrigin: true,
                // rewrite: (path:string) => path.replace(/^\/api/, ""),
            },
        },
        cors: {
            origin: 'http://127.0.0.1:3000',
        },
    },
});
