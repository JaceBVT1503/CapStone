# Highlighting & Commenting Feature

I've successfully added a highlighting and commenting feature to your chat application, similar to Google Docs. This feature allows research participants to highlight important parts of their conversation and add comments.

## Features

### 1. **Text Highlighting**
- Select any text in a chat message (both user messages and assistant responses)
- Choose from 4 color options:
  - Yellow (default)
  - Pink
  - Blue
  - Green
- Highlighted text is visually marked in the chat interface

### 2. **Comments**
- Add optional comments to explain why you highlighted specific text
- Comments appear in the sidebar and in the message itself
- Edit or delete comments at any time

### 3. **Comments Sidebar**
- Toggle the comments sidebar with the "Show/Hide Comments" button in the header
- View all highlights and comments organized by message
- Each highlight displays:
  - A color indicator
  - The highlighted text snippet
  - The comment (if added)
  - A delete button to remove the highlight

### 4. **Data Organization**
- All highlights are stored in component state
- Each highlight includes:
  - The message ID it belongs to
  - Character offsets (start and end positions in the text)
  - Color selection
  - Optional comment text
  - Timestamp of when it was created

## How to Use

### To Highlight Text:
1. Select text in any chat message by clicking and dragging
2. A toolbar will appear with:
   - A preview of selected text
   - 4 color buttons to choose a highlight color
   - A text field for adding an optional comment
   - A Cancel button
3. Click a color button to apply the highlight
4. The text will be highlighted and a summary will appear below the message

### To View Highlights:
1. Click "Show Comments" button in the header to display the sidebar
2. The sidebar shows all highlighted sections organized by message
3. Each highlight displays the color, text, and comment

### To Delete a Highlight:
- Click the × button next to any highlight in the sidebar, or in the message details
- The highlight will be immediately removed

## Technical Implementation

### New Files Created:
- **[src/lib/useHighlights.js](src/lib/useHighlights.js)** - Custom React hook managing highlight state
- **[src/app/HighlightableMessage.js](src/app/HighlightableMessage.js)** - Component for rendering messages with highlighting
- **[src/app/HighlightableMessage.module.css](src/app/HighlightableMessage.module.css)** - Styling for highlights and toolbar

### Modified Files:
- **[src/app/page.js](src/app/page.js)** - Integrated highlighting feature into main chat interface
- **[src/app/page.module.css](src/app/page.module.css)** - Added sidebar and layout styles

## Design Notes

### Accessibility
- Text selection works with mouse and touch
- Keyboard accessible toolbar buttons
- Color indicators help with visual identification
- Semantic HTML structure for screen readers

### Responsive Design
- On desktop: Sidebar appears on the right side (280px width)
- On tablets: Sidebar width reduces to 240px
- On mobile: Sidebar converts to a collapsible section below the chat (height: 200px)

### Dark Mode Support
- Full dark mode compatibility
- Highlights maintain visibility in dark mode
- Proper contrast ratios maintained

## Integration with Research Data

The highlights data is stored in React state during the session. If you want to export or persist this data:

1. **Export Highlights**: You can extend the code to save highlights to localStorage, a database, or send them to your backend
2. **CSV Export**: Each highlight can be exported with columns: message_id, start_offset, end_offset, color, comment, timestamp
3. **Backend Integration**: Add an API endpoint to save highlights with the conversation

Example structure for each highlight:
```json
{
  "id": "uuid",
  "messageId": "uuid",
  "startOffset": 15,
  "endOffset": 42,
  "color": "yellow",
  "comment": "Important insight about AI limitations",
  "createdAt": 1710865200000
}
```

## Future Enhancements

Potential features for the future:
- Export highlights and comments as PDF
- Share highlights with study coordinators
- Search highlights by keyword or color
- Filter messages by whether they contain highlights
- Highlight categories (e.g., "interesting", "confusing", "important")
- Highlight analytics to identify commonly highlighted topics
- Real-time collaboration for reviewing highlights

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

The feature is fully integrated and ready to use! Participants can now easily mark up their conversations for research analysis.
