# Task Manager App - React Native (Midterm Project)

This is a fully functional Task Manager app built with **React Native** for the INF657 Midterm. It allows users to add, view, and delete tasks with proper styling and functionality across both Android and Web platforms.

---

## ✅ Features Implemented

### 📋 Task List with FlatList

- Displays a list of tasks using `FlatList`.
- Each task shows: **Title**, **Description**, **Category**, **Date & Time**, and **Image**.
- Uses `AsyncStorage` to persist task data.

### 🔍 Task Details Screen with Navigation

- Navigates to a `TaskDetailScreen` on task tap.
- Shows all task details, including the image (with fallback support).

### ➕ Add New Task

- Users can create tasks via `AddTaskScreen`.
- Uses:

  - `TextInput` for title and description
  - `react-native-paper` dropdown for category selection
  - `react-native-modal-datetime-picker` for date/time
  - Local image fallback from `assets/tasks/task-image.png`

### 🗑️ Task Deletion

- Swipe-to-delete enabled via `Swipeable` from `react-native-gesture-handler`.
- Tasks are removed immediately and persisted.

### 🎨 Styling

- Uses `StyleSheet.create()`
- Implements Flexbox layout, padding, margins, borders, and shadow for enhanced UX.

### 🛠️ Debugging & Optimization

- Used console logs and VS Code debugger to trace issues.
- Adjusted platform-specific components for mobile and web.
- Ensured Fast Refresh is active during development.

---

## 📁 Project Structure

```
📦screens
 ┣ 📜TaskListScreen.js
 ┣ 📜TaskDetailScreen.js
 ┗ 📜AddTaskScreen.js
📦assets
 ┗ 📂tasks
   ┗ 📜task-image.png
📜App.js
📜package.json
```

---

## 🚀 How to Run

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go or press `w` to open in browser.

---

## 📌 Notes

- All local images use `require()` and fallback logic.
- Date pickers are modal-based and optimized.
- State is stored in `AsyncStorage` and refreshed when app resumes.

---

## 🙌 Author

**Kyle Lavigne**
INF657 Midterm Project – Fort Hays State University

---

## 📎 License

MIT License. For academic use only.
