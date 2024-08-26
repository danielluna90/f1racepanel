import * as DockerUtils from 'entrypoints/docker/utils';

await DockerUtils.InitializeDocker();
await DockerUtils.GetLatestDatabaseFile();
await DockerUtils.CloseDocker();
