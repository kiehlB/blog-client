import React from "react";

import { INLINE_STYLE, BLOCK_TYPE, ENTITY_TYPE } from "draftail";


import ImageBlock from "./blocks/ImageBlock";
import EmbedBlock from "./blocks/EmbedBlock";
import ImageSource from "./sources/ImageSource";
import DocumentSource from "./sources/DocumentSource";
import EmbedSource from "./sources/EmbedSource";
import Document from "./entity/Document";
import Link from "./entity/Link";
import LinkSource from "./sources/LinkSource";
import FontIcon from "./components/FontIcon";

export const EMBED_ICON = <FontIcon icon="embed" />;
export const BR_ICON =
    "M.436 633.471l296.897-296.898v241.823h616.586V94.117h109.517v593.796H297.333v242.456z";
export const UNDO_ICON =
    "M496.485 78c-137.092 0-261.213 55.575-351.046 145.439L.031 78v372.364h372.364L233.224 311.193c67.398-67.398 160.488-109.072 263.292-109.072 205.638 0 372.364 166.726 372.364 372.364 0 111.212-48.78 211.037-126.077 279.273l82.107 93.09C927.992 855.868 993 722.778 993 574.485 993 300.27 770.73 78 496.517 78h-.031z";
export const REDO_ICON =
    "M0 576c0 152.928 67.04 290.176 173.344 384l84.672-96C178.304 793.632 128 690.688 128 576c0-212.064 171.936-384 384-384 106.048 0 202.048 42.976 271.52 112.48L640 448h384V64L874.016 213.984C781.376 121.312 653.376 64 512 64 229.216 64 0 293.216 0 576z";

export const INLINE_CONTROL = {
    BOLD: { type: INLINE_STYLE.BOLD, style: { fontWeight: "bold" } },
    ITALIC: { type: INLINE_STYLE.ITALIC, style: { fontStyle: "italic" } },
    CODE: { type: INLINE_STYLE.CODE, style: { fontFamily: "monospaced" } },
    UNDERLINE: {
        type: INLINE_STYLE.UNDERLINE,
        style: { textDecoration: "underline" }
    },
    STRIKETHROUGH: {
        type: INLINE_STYLE.STRIKETHROUGH,
        style: { textDecoration: "line-through" }
    },
    MARK: { type: INLINE_STYLE.MARK, style: { backgroundColor: "yellow" } },
    QUOTATION: {
        type: INLINE_STYLE.QUOTATION,
        style: { backgroundColor: "#ff8f8f", quotes: '"\'" "\'"' }
    },
    SMALL: { type: INLINE_STYLE.SMALL, style: { fontSize: "bold" } },
    SAMPLE: {
        type: INLINE_STYLE.SAMPLE,
        style: {
            fontFamily:
                "Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, sans-serif"
        }
    },
    INSERT: {
        type: INLINE_STYLE.INSERT,
        style: { textDecoration: "underline", backgroundColor: "#a7ff8a" }
    },
    DELETE: {
        type: INLINE_STYLE.DELETE,
        style: { textDecoration: "line-through", backgroundColor: "#ff8f8f" }
    },
    KEYBOARD: {
        type: INLINE_STYLE.KEYBOARD,
        style: {
            fontFamily:
                'Consolas, Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, sans-serif',
            padding: "3px 5px",
            fontSize: "11px",
            lineHeight: "10px",
            color: "rgb(68, 77, 86)",
            verticalAlign: "middle",
            backgroundColor: "rgb(250, 251, 252)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgb(198, 203, 209) rgb(198, 203, 209) rgb(149, 157, 165)",
            borderImage: "initial",
            borderRadius: "3px",
            boxShadow: "rgb(149, 157, 165) 0px -1px 0px inset"
        }
    },
    SUPERSCRIPT: { type: INLINE_STYLE.SUPERSCRIPT },
    SUBSCRIPT: { type: INLINE_STYLE.SUBSCRIPT }
};

export const BLOCK_CONTROL = {
    UNSTYLED: { type: BLOCK_TYPE.UNSTYLED },
    HEADER_ONE: { type: BLOCK_TYPE.HEADER_ONE },
    HEADER_TWO: { type: BLOCK_TYPE.HEADER_TWO },
    HEADER_THREE: { type: BLOCK_TYPE.HEADER_THREE },
    HEADER_FOUR: { type: BLOCK_TYPE.HEADER_FOUR },
    HEADER_FIVE: { type: BLOCK_TYPE.HEADER_FIVE },
    HEADER_SIX: { type: BLOCK_TYPE.HEADER_SIX },
    UNORDERED_LIST_ITEM: { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
    ORDERED_LIST_ITEM: { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
    BLOCKQUOTE: {
        type: BLOCK_TYPE.BLOCKQUOTE,
        style: { backgroundColor: "grey", color: "white", fontWeight: "600" }
    },
    CODE: { type: BLOCK_TYPE.CODE },
    TINY_TEXT_BLOCK: {
        type: "tiny-text",
        label: "Tiny",
        description: "Legal print",
        element: "blockquote"
    },
    REDACTED_STYLE: {
        type: "REDACTED",
        label: "Redacted",
        description: "Redacted",
        style: { backgroundColor: "currentcolor" }
    }
};

export const ENTITY_CONTROL = {
    LINK: {
        type: ENTITY_TYPE.LINK,
        source: LinkSource,
        decorator: Link,
        attributes: ["url"],
        whitelist: {
            href: "^(?![#/])"
        }
    },
    IMAGE: {
        type: ENTITY_TYPE.IMAGE,
        description: "Image",
        source: ImageSource,
        block: ImageBlock,
        attributes: ["src", "alt"],
        whitelist: {
            src: "^(?!(data:|file:))"
        }
    },
    EMBED: {
        type: "EMBED",
        description: "Embed",
        source: EmbedSource,
        block: EmbedBlock,
        attributes: ["url", "title", "thumbnail", "html"],
        icon: <span>embed</span>
    },
    DOCUMENT: {
        type: "DOCUMENT",
        description: "Document",
        source: DocumentSource,
        decorator: Document,
        attributes: ["url"],
        icon: <span>DOCUMENT</span>
    }
};
