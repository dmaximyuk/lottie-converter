package main

import (
	"bytes"
	"compress/zlib"
	"fmt"
	"syscall/js"
)

func PackWithArchiveJS(this js.Value, args []js.Value) interface{} {
	if len(args) == 0 {
		return js.ValueOf("no input data provided")
	}

	data := make([]byte, args[0].Get("length").Int())
	js.CopyBytesToGo(data, args[0])

	result, err := PackWithArchive(data)
	if err != nil {
		return js.ValueOf(fmt.Sprintf("error: %s", err))
	}

	output := js.Global().Get("Uint8Array").New(len(result))
	js.CopyBytesToJS(output, result)
	return output
}

func PackWithArchive(data []byte) ([]byte, error) {
	var buf bytes.Buffer
	writer, err := zlib.NewWriterLevel(&buf, zlib.BestCompression)
	if err != nil {
		return nil, err
	}
	defer writer.Close()

	if _, err := writer.Write(data); err != nil {
		return nil, err
	}

	writer.Close()
	return buf.Bytes(), nil
}

func main() {
	js.Global().Set("PackWithArchive", js.FuncOf(PackWithArchiveJS))
	select {}
}
