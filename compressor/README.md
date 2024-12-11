# Compile
### Steps
1. run: `GOOS=js GOARCH=wasm go build -ldflags="-s -w" -o main.wasm`
2. run: `cp $(go env GOROOT)/misc/wasm/wasm_exec.js .`

Done!