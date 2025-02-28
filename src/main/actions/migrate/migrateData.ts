/**
 * migrateData
 * @author: oldj
 * @homepage: https://oldj.net
 */

// migrate data from v3 to v4

import { swhdb } from '@main/data'
import getDataFolder from '@main/libs/getDataFolder'
import { IHostsBasicData, VersionType } from '@root/common/data'
import { cleanHostsList, flatten } from '@root/common/hostsFn'
import version from '@root/version.json'
import * as fs from 'fs'
import path from 'path'

const readOldData = async (): Promise<IHostsBasicData> => {
  const fn = path.join(await getDataFolder(), 'data.json')
  const default_data: IHostsBasicData = {
    list: [],
    trashcan: [],
    version: version as VersionType,
  }

  if (!fs.existsSync(fn)) {
    return default_data
  }

  let content = await fs.promises.readFile(fn, 'utf-8')
  try {
    let data = JSON.parse(content) as IHostsBasicData
    return cleanHostsList(data)
  } catch (e) {
    console.error(e)
    return default_data
  }
}

export default async () => {
  let old_data = await readOldData()

  let { list } = old_data
  let hosts = flatten(list)

  for (let h of hosts) {
    if (h.refresh_interval) {
      h.refresh_interval *= 3600
    }

    h.type = h.where
    delete h.where

    await swhdb.collection.hosts.insert(h)
    h.content = ''
  }

  await swhdb.list.tree.extend(...list)
  await swhdb.dict.meta.set('version', version)
}
