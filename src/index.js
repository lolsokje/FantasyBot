const client = require('./singletons/client');
const registry = require('./singletons/registry');
const auth = require('./auth.json');
const path = require('path');
const patron = require('patron.js');
const requireAll = require('patron.js').RequireAll;

client.registry = registry;
requireAll(path.join(__dirname, './events'));

(async () => {
	const registry = require('./singletons/registry');
	registry.registerGlobalTypeReaders();
	registry.registerLibraryTypeReaders();
	const preconditions = await requireAll(path.join(__dirname, './preconditions'));
	registry.registerPreconditions(preconditions.filter(p => p instanceof patron.Precondition));
	registry.registerArgumentPreconditions(preconditions.filter(p => p instanceof patron.ArgumentPrecondition));
	registry.registerGroups(await requireAll(path.join(__dirname, './groups')));
	registry.registerCommands(await requireAll(path.join(__dirname, './commands')));
	return client.login(auth.token);
})();
