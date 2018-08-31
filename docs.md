# SWITCH GUI Light Dev Documentation


## General overview

This version of the SWITCH GUI is at its core a ReactJS application which is meant to be run on the web but can easily be wrapped in an Electron desktop app.

An objective for fast development includes having as few dependencies as possible.

At the time of writing the application really only has the following dependencies:

- React Router v4
- Recharts (React + D3 charts)
- Sass (CSS preprocessor)

An explicit decision was made not to add any more dependencies and great thought should be given when adding a new dependency.


## Code Organization

Under the `src/` folder you will find 3 different types of files: `jsx`, `scss`, and `css`. The directory structure groups the components in their own folder. Every file pertaining to a particular component will go in a folder of the component's name.

Ignore the `css` files. These are the compiled versions of the `scss` (SASS) versions. They are automatically generated and must not be modified by you.

The `jsx` files contain the React components.


```
src/
 |-- App.css
 |-- App.jsx
 |-- App.scss
 |-- App.test.js
 |-- components
 |   |-- Capacity/
 |   |-- Charts/
 |   |-- MainContent.jsx
 |   |-- PeriodSlider/
 |   |-- Sidebar.css
 |   |-- Sidebar.jsx
 |   |-- Sidebar.scss
 |   `-- TD/
 |-- data
 |   |-- loadZones.json
 |-- index.css
 |-- index.js
 `-- sass
     `-- _vars.scss
```


### `data` folder

Use this folder to store static data files that change with relative infrequency. Right now this is being used to store the map for the load zones in Mexico.

Store data in JSON formats only. Use GeoJSON for geographical data.



## Main components


| Name | Description |
| ---- | ----------- |
| Capacity |  Capacity view inputs |
| Charts |  All charts will go in here We are aiming to make these as logic-independent as possible so as to make them as reusable as possible |
| Sidebar |  The sidebar menu |
| MainContent |  The main container for the Router |
| TD (Transmission & Distribution) | Transmission & distrubition input view |
| CapacityMap | Map for Capacity inputs view |
| TransmissionMap | Map containing current transmission lines for Transmission view |

## Utility components

| Name | Description |
| ---- | ----------- |
| PeriodSlider | Slider for the periods that will be reused multiple times to slice the data |
| DashboardWidget | Element to show a static or computed value on dashboard (card) |

## Adding components

1. Create a new `.jsx` file under the `components/` directory. If this is a large component, create a subdirectory with the component name under `components/`
2. `export default` the React class.

A typical React class will look like this:

```JSX
import React from 'react';

export default class MyNewComponent extends React.Component {
	render() {
		return(
			<div>
				This is my new component. Content goes here
			</div>
		);
	}
}

```

Be mindful and try to follow the general React patterns of Presentational + Container components. You can read more about this design pattern in React [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

3. Add the component to the router in `MainContent.jsx` as a new route or embed it in the correct component.
	- If you need to create a subroute, use the `<Switch>` component in React Router and add it at the corresponding sub-level.
4. Optionally create a styles `.scss` file with the same name as the component. This will automatically be picked up by the SASS preprocessor when running `yarn (npm) run start`

## Supporting a new module

There is no predefined workflow for adding support for a new module from the original SWITCH model. This is a very ad-hoc process because there really is no underlying logic to the modules that SWITCH supports. Therefore it is up to the client and developer to decide where and when it makes sense to add a feature to support a new module.

For the most part, you will want to add a new menu item to the `<Sidebar>` component.

If you follow the existing structure in that file it should be pretty straightforward to add a new link. Once you have added a new link in the Sidebar, you should a its corresponding `<Route>` in the `MainContent.jsx` file.


## Ejecting

The current app was created using [`create-react-app`](https://github.com/facebook/create-react-app). As such, most of the components are abstracted away. You can read the section on [ejecting and deployment](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment) if you want to get all the components and customize them (or for deployment). It is **strongly encouraged** to remain unejected while developing unless you have a very compelling reason to eject. Note that this is not a reversible operation.



