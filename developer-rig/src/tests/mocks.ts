
export function mockFetchForManifest() {
  return Promise.resolve({
    ok: true,
    json: () => ({
      data: [{
        id: '0',
      }]
    }),
  });
}

export function mockFetchForExtensionManifest() {
  return Promise.resolve({
    ok: true,
    json: () => ({
      extensions: [{
        version: 1,
        id: 'clientid',
        views: {}
      }]
    }),
  });
}

export function mockFetchForUserInfo() {
  return Promise.resolve({
    ok: true,
    json: () => ({
      data: [{
        login: 'test',
        profile_image_url: 'test.png',
      }]
    })
  });
}

export function mockFetchError() {
  return Promise.reject('Fake error');
}

export function mockFetchProducts() {
  return Promise.resolve({
    json: () => ({
      products: [{
        domain: 'twitch.ext.mock',
        sku: 'test1',
        displayName: 'Test 1',
        cost: {amount: 1, type: 'bits'},
        inDevelopment: true,
        broadcast: false
      },
      {
        domain: 'twitch.ext.mock',
        sku: 'test2',
        displayName: 'Test 2',
        cost: {amount: 100, type: 'bits'},
        inDevelopment: false,
        broadcast: false
      }]
    })
  });
}

export function mockFetchNewRelease() {
  return Promise.resolve({
    ok: true,
    json: () => ({
      tag_name: '0.0.0',
      assets: [{
        browser_download_url: 'test.zip'
        }]
    })
  });
}
