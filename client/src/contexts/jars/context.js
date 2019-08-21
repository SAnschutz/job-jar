import React, { useState } from 'react';

const JarsContext = React.createContext();

export const JarsProvider = JarsContext.Provider;
export const JarsConsumer = JarsContext.Consumer;
export default JarsContext;
