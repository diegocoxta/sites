export default jest.fn().mockImplementation((...props: unknown[]) => {
  const dynamicModule = jest.requireActual('next/dynamic');
  const dynamicActualComp = dynamicModule.default;
  const RequiredComponent = dynamicActualComp(props[0]);

  if (RequiredComponent.preload) {
    RequiredComponent.preload();
  } else {
    RequiredComponent.render.preload();
  }

  return RequiredComponent;
});
