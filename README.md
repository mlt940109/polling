# polling

polling is a simple module for long polling

## Installation

```
$ npm install polling
```

## Usage

When you need to hang http request, use
```
polling.on(id, res);
```
to bind a specific id to the res, you can bind multiple res to one id.

when you need to send a message to the res, then use
```
polling.emit(id, msg);
```
to send an event.

This module built-in function to clean up invalid connections, you can use
```
setClaerInterval(msecond);
```
to set the cleanup interval.

When you used ```http``` module, polling will calls ```end()``` to send message;
When you used ```express``` modules, polling will calls ```send()``` to send message.

## Note

Please note res will be destroyed after ```emit()```, so your browser needs to carry out the request after receiving the response again.

## author

ngtmuzi, ngtmuzi@qq.com

## License

MIT