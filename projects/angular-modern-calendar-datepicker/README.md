# Angular Modern Calendar Datepicker

A comprehensive, modern Angular datepicker library that supports multiple calendar systems including Jalali (Persian), Gregorian, and Hijri calendars. This library provides a highly customizable and feature-rich datepicker component with built-in RTL support and dark mode.

## Features

- **Multi-Calendar Support**: Jalali (Persian), Gregorian, and Hijri calendars
- **RTL Support**: Full right-to-left language support
- **Dark Mode**: Built-in dark theme support
- **Date Range Selection**: Support for selecting date ranges
- **Customizable Styling**: Configurable colors and themes using Tailwind CSS
- **Responsive Design**: Mobile-friendly and responsive layout
- **TypeScript Support**: Full TypeScript support with proper typing
- **Accessibility**: Built with accessibility best practices
- **Virtual Scrolling**: Efficient performance with large date ranges

## Installation

```bash
npm install angular-modern-calendar-datepicker
```

## Quick Start

1. Import the module in your Angular module:

```typescript
import { AmdDatepickerModule } from 'angular-modern-calendar-datepicker';

@NgModule({
  imports: [
    AmdDatepickerModule
  ]
})
export class YourModule { }
```

2. Use the datepicker in your component:

```html
<amd-datepicker 
  [calendarType]="'jalali'"
  [darkMode]="false"
  [primaryColor]="'#38b0ac'"
  (onDateSelect)="onDateSelect($event)">
</amd-datepicker>
```

## Calendar Types

The library supports three calendar systems:

- **Jalali (Persian)**: `CalendarType.JALALI`
- **Gregorian**: `CalendarType.GREGORIAN` 
- **Hijri**: `CalendarType.HIJRI`

## API Reference

### AmdDatepickerComponent

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `calendarType` | `CalendarType` | `CalendarType.JALALI` | Calendar system to use |
| `calendarMode` | `CalendarMode` | `CalendarMode.DATEPICKER` | Mode: datepicker or daterangepicker |
| `darkMode` | `boolean` | `false` | Enable dark theme |
| `primaryColor` | `string` | `'#38b0ac'` | Primary color for theming |
| `min` | `Moment` | - | Minimum selectable date |
| `max` | `Moment` | - | Maximum selectable date |
| `isPastDisabled` | `boolean` | `false` | Disable past dates |
| `showMonthOutOfRangeDays` | `boolean` | `false` | Show days from previous/next month |
| `date` | `Moment` | - | Currently selected date |
| `dateRange` | `DateRange` | - | Selected date range |
| `containerStyle` | `string` | - | Custom CSS classes |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `onDateSelect` | `EventEmitter<Moment>` | Emitted when a date is selected |
| `onDateRangeSelect` | `EventEmitter<DateRange>` | Emitted when a date range is selected |

## Usage Examples

### Basic Datepicker

```html
<amd-datepicker 
  [calendarType]="'jalali'"
  (onDateSelect)="handleDateSelect($event)">
</amd-datepicker>
```

### Date Range Picker

```html
<amd-datepicker 
  [calendarMode]="'daterangepicker'"
  [calendarType]="'gregorian'"
  (onDateRangeSelect)="handleRangeSelect($event)">
</amd-datepicker>
```

### With Custom Styling

```html
<amd-datepicker 
  [darkMode]="true"
  [primaryColor]="'#3b82f6'"
  [containerStyle]="'custom-datepicker'"
  [calendarType]="'hijri'">
</amd-datepicker>
```

### With Date Constraints

```html
<amd-datepicker 
  [min]="minDate"
  [max]="maxDate"
  [isPastDisabled]="true"
  [calendarType]="'jalali'">
</amd-datepicker>
```

## Development

### Building the Library

Run `ng build angular-modern-calendar-datepicker` to build the project. The build artifacts will be stored in the `dist/` directory.

### Publishing

After building your library with `ng build angular-modern-calendar-datepicker`, go to the dist folder `cd dist/angular-modern-calendar-datepicker` and run `npm publish`.

### Running Tests

Run `ng test angular-modern-calendar-datepicker` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Dependencies

- Angular 15+
- Moment.js and related calendar libraries
- Tailwind CSS for styling
- ngx-ui-scroll for virtual scrolling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Mohammad Hosein Abedini

## Repository

https://github.com/mhabedini/angular-modern-calendar-datepicker
