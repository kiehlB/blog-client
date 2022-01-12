// @flow
export default {
  entityMap: {
    '0': {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: { url: 'www.example.com' },
    },
    '1': {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: { url: 'www.example.com' },
    },
    '2': { type: 'HORIZONTAL_RULE', mutability: 'IMMUTABLE', data: {} },
    '3': {
      type: 'IMAGE',
      mutability: 'IMMUTABLE',
      data: { alt: '', src: 'http://lorempixel.com/400/200' },
    },
  },
  blocks: [
    {
      key: '16d0k',
      text: 'You can edit this text.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 23, style: 'unstyled' }],
      entityRanges: [],
      data: {},
    },
  ],
}
