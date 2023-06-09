### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

PureComponent performs only shallow comparisons. For pure component child should be pure as well in order to avoid, otherwise shouldComponentUpdate() will skip prop updates for the whole component subtree

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Should component update relies on component props, on the other hand context is different data source flow for component. it can lead to data inconsistency.

### 3. Describe 3 ways to pass information from a component to its PARENT.

    Callback functions
    Context API
    State Management libraries - Redux, MobX

### 4. Give 2 ways to prevent components from re-rendering.

React memo, ShouldComponentUpdate

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is a component that allows you to group multiple elements together without adding an additional DOM element. You cann't add key do fragments, for example if you have some list mapping, you need to add unique key to each list item, to make performance better, but using fragments in for-loops can break performance. 

### 6. Give 3 examples of the HOC pattern.

    1. connect - from react-redux, which wraps component and returns new connected component
    2. withRouter - from react-router, which wraps component and injects routing props
    3. withStyles - from material-ui, which wraps component and applies custom styles to component

### 7. What's the difference in handling exceptions in promises, callbacks and async...await?

The main difference is in the syntax and code structure. 
For promises is being used .catch method, for async await it is try/catch, and for callback it is simple passing error parameter and checking inside function

### 8. How many arguments does setState take and why is it async.

SetState takes up to 2 arguments. It is asynchronous to optimize react performance, because batches multiple state updates and perform single rerendering.

### 9. List the steps needed to migrate a Class to Function Component.

1. move code to the functional component
2. rewrite state management
3. find out all used lifecycles
4. replace lifecycles with hooks
5. update event handlers
6. test if everything works correctly

### 10. List a few ways styles can be used with components.

1. inline styles
2. styled components
3. css module such as (less, scss)

### 11. How to render an HTML string coming from the server.

HTML string can be rendered as an html by dangerouslySetInnerHTML