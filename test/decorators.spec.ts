import { Metadata, MetadataHelper } from '../src/decorator/metadata'
import { ModelMetadata } from '../src/decorator/model-metadata.model'
import { Moment } from '../src/decorator/moment.type'
import { PropertyMetadata } from '../src/decorator/property-metadata.model'
import { ComplexModel, NestedObject } from './models/complex.model'
import { CustomTableNameModel } from './models/custom-table-name.model'
import { ModelWithDateMoment } from './models/model-with-date-moment.model'
import {
  DifferentModel,
  INDEX_ACTIVE_CREATED_AT,
  INDEX_COUNT,
  ModelWithABunchOfIndexes,
  ModelWithGSI,
  ModelWithWrongIndexes,
} from './models/model-with-indexes.model'
import { SimpleModel } from './models/simple.model'

describe('Decorators should add correct metadata', () => {
  describe('for simple model', () => {
    let modelOptions: ModelMetadata<SimpleModel>

    beforeEach(() => {
      modelOptions = MetadataHelper.get(SimpleModel).modelOptions
    })

    it('with default table name', () => {
      expect(modelOptions).toBeDefined()
      expect(modelOptions.tableName).toBe('simple-model')
      expect(modelOptions.clazz).toBe(SimpleModel)
      expect(modelOptions.clazzName).toBe('SimpleModel')
    })

    it('with no properties', () => {
      expect(modelOptions.properties).toBeUndefined()
    })
  })

  describe('for custom table name', () => {
    let modelOptions: ModelMetadata<CustomTableNameModel>

    beforeEach(() => {
      modelOptions = MetadataHelper.get(CustomTableNameModel).modelOptions
    })

    it('with custom table name', () => {
      expect(modelOptions).toBeDefined()
      expect(modelOptions.tableName).toBe('myCustomName')
      expect(modelOptions.clazz).toBe(CustomTableNameModel)
      expect(modelOptions.clazzName).toBe('CustomTableNameModel')
    })
  })

  describe('for model with dates (type MomentJS)', () => {
    let modelOptions: ModelMetadata<ModelWithDateMoment>

    beforeEach(() => {
      modelOptions = MetadataHelper.get(ModelWithDateMoment).modelOptions
    })

    it('id', () => {
      const prop = getProperty(modelOptions, 'id')
      expect(prop).toBeDefined()
      expect(prop.name).toBe('id')
      expect(prop.nameDb).toBe('id')
      expect(prop.key).toBeDefined()
      expect(prop.key.type).toBe('HASH')
      expect(prop.key.uuid).toBeFalsy()
      expect(prop.transient).toBeFalsy()
      expect(prop.typeInfo).toBeDefined()
      expect(prop.typeInfo.isCustom).toBeFalsy()
      expect(prop.typeInfo.type).toBe(String)
    })

    it('creationDate', () => {
      const prop = getProperty(modelOptions, 'creationDate')
      expect(prop).toBeDefined()
      expect(prop.name).toBe('creationDate')
      expect(prop.nameDb).toBe('creationDate')
      expect(prop.key).toBeDefined()
      expect(prop.key.type).toBe('RANGE')
      expect(prop.key.uuid).toBeFalsy()
      expect(prop.transient).toBeFalsy()
      expect(prop.typeInfo).toBeDefined()
      expect(prop.typeInfo.isCustom).toBeTruthy()
      expect(prop.typeInfo.type).toBe(Moment)
    })

    it('lastUpdated', () => {
      const prop = getProperty(modelOptions, 'lastUpdated')
      expect(prop).toBeDefined()
      expect(prop.name).toBe('lastUpdated')
      expect(prop.nameDb).toBe('lastUpdated')
      expect(prop.key).toBeUndefined()
      expect(prop.transient).toBeFalsy()
      expect(prop.typeInfo).toBeDefined()
      expect(prop.typeInfo.isCustom).toBeTruthy()
      expect(prop.typeInfo.type).toBe(Moment)
    })
  })

  describe('for complex model', () => {
    let modelOptions: ModelMetadata<ComplexModel>

    beforeEach(() => {
      modelOptions = MetadataHelper.get(ComplexModel).modelOptions
    })

    it('with default model metadata', () => {
      expect(modelOptions.tableName).toBe('complex_model')
      expect(modelOptions.clazz).toBe(ComplexModel)
      expect(modelOptions.clazzName).toBe('ComplexModel')
    })

    it('with correct properties', () => {
      expect(modelOptions.properties).toBeDefined()
      expect(modelOptions.properties.length).toBe(10)
    })

    it('with correct transient properties', () => {
      expect(modelOptions.transientProperties).toBeDefined()
      expect(modelOptions.transientProperties.length).toBe(1)
    })

    describe('with correct property metdata', () => {
      it('ids', () => {
        const prop = getProperty(modelOptions, 'id')
        expect(prop).toBeDefined()
        expect(prop.name).toBe('id')
        expect(prop.nameDb).toBe('id')
        expect(prop.key).toBeDefined()
        expect(prop.key.type).toBe('HASH')
        expect(prop.key.uuid).toBeFalsy()
        expect(prop.transient).toBeFalsy()
        expect(prop.typeInfo).toBeDefined()
        expect(prop.typeInfo.isCustom).toBeFalsy()
        expect(prop.typeInfo.type).toBe(String)
      })

      it('creationDate', () => {
        const prop = getProperty(modelOptions, 'creationDate')
        expect(prop).toBeDefined()
        expect(prop.name).toBe('creationDate')
        expect(prop.nameDb).toBe('creationDate')
        expect(prop.key).toBeDefined()
        expect(prop.key.type).toBe('RANGE')
        expect(prop.key.uuid).toBeFalsy()
        expect(prop.transient).toBeFalsy()
        expect(prop.typeInfo).toBeDefined()
        expect(prop.typeInfo.isCustom).toBeTruthy()
        expect(prop.typeInfo.type).toBe(Moment)
      })

      it('lastUpdated', () => {
        const prop = getProperty(modelOptions, 'lastUpdated')
        expect(prop).toBeDefined()
        expect(prop.name).toBe('lastUpdated')
        expect(prop.nameDb).toBe('lastUpdated')
        expect(prop.key).toBeUndefined()
        expect(prop.transient).toBeFalsy()
        expect(prop.typeInfo).toBeDefined()
        expect(prop.typeInfo.isCustom).toBeTruthy()
        expect(prop.typeInfo.type).toBe(Moment)
      })

      it('active', () => {
        const prop = getProperty(modelOptions, 'active')
        expect(prop).toBeDefined()
        expect(prop.name).toBe('active')
        expect(prop.nameDb).toBe('isActive')
        expect(prop.key).toBeUndefined()
        expect(prop.transient).toBeFalsy()
        expect(prop.typeInfo).toBeDefined()
        expect(prop.typeInfo.isCustom).toBeFalsy()
        expect(prop.typeInfo.type).toBe(Boolean)
      })

      it('set', () => {
        const prop = getProperty(modelOptions, 'set')
        expect(prop).toBeDefined()
        expect(prop.name).toBe('set')
        expect(prop.nameDb).toBe('set')
        expect(prop.key).toBeUndefined()
        expect(prop.transient).toBeFalsy()
        expect(prop.typeInfo).toBeDefined()
        expect(prop.typeInfo.isCustom).toBeTruthy()
        expect(prop.typeInfo.type).toBe(Set)
      })

      // TODO decide if we support map or not
      // xit("myMap", () => {
      //   const prop = getProperty(modelOptions, "myMap")
      //   expect(prop).toBeDefined()
      //   expect(prop.key).toBe("myMap")
      //   expect(prop.name).toBe("myMap")
      //   expect(prop.partitionKey).toBeFalsy()
      //   expect(prop.sortKey).toBeFalsy()
      //   expect(prop.transient).toBeFalsy()
      //   expect(prop.typeInfo).toBeDefined()
      //   expect(prop.typeInfo.isCustom).toBeTruthy()
      //   expect(prop.typeInfo.type).toBe(Map)
      //   expect(prop.typeInfo.typeName).toBe("Map")
      // })

      it('sortedSet', () => {
        const prop = getProperty(modelOptions, 'sortedSet')
        expect(prop).toBeDefined()
        expect(prop.name).toBe('sortedSet')
        expect(prop.nameDb).toBe('sortedSet')
        expect(prop.key).toBeUndefined()
        expect(prop.transient).toBeFalsy()
        expect(prop.isSortedCollection).toBeTruthy()
        expect(prop.typeInfo).toBeDefined()
        expect(prop.typeInfo.isCustom).toBeTruthy()
        expect(prop.typeInfo.type).toBe(Set)
      })

      it('sortedComplexSet', () => {
        const prop = getProperty(modelOptions, 'sortedComplexSet')
        expect(prop).toBeDefined()
        expect(prop.name).toBe('sortedComplexSet')
        expect(prop.nameDb).toBe('sortedComplexSet')
        expect(prop.key).toBeUndefined()
        expect(prop.transient).toBeFalsy()
        expect(prop.isSortedCollection).toBeTruthy()

        expect(prop.typeInfo).toBeDefined()
        expect(prop.typeInfo.isCustom).toBeTruthy()
        expect(prop.typeInfo.type).toBe(Set)

        expect(prop.typeInfo.genericTypes).toBeDefined()
        expect(prop.typeInfo.genericTypes.length).toBe(1)
        expect(prop.typeInfo.genericTypes[0]).toBe(NestedObject)
      })

      it('mapWithNoType', () => {
        const prop = getProperty(modelOptions, 'mapWithNoType')
        expect(prop).toBeDefined()
        expect(prop.name).toBe('mapWithNoType')
        expect(prop.nameDb).toBe('mapWithNoType')
        expect(prop.key).toBeUndefined()
        expect(prop.transient).toBeFalsy()
        expect(prop.typeInfo).toBeDefined()
        expect(prop.typeInfo.isCustom).toBeTruthy()
        expect(prop.typeInfo.type).toBe(Object)
      })

      it('transientField', () => {
        const prop = getProperty(modelOptions, 'transientField')
        expect(prop).toBeDefined()
        expect(prop.name).toBe('transientField')
        expect(prop.nameDb).toBe('transientField')
        expect(prop.key).toBeUndefined()
        expect(prop.transient).toBeTruthy()
        expect(prop.typeInfo).toBeDefined()
        expect(prop.typeInfo.isCustom).toBeFalsy()
        expect(prop.typeInfo.type).toBe(String)
      })

      it('simpleProperty', () => {
        const prop = getProperty(modelOptions, 'simpleProperty')
        expect(prop).toBeUndefined()
      })

      it('nestedObject', () => {
        const prop = getProperty(modelOptions, 'nestedObj')
        expect(prop).toBeDefined()
        expect(prop.name).toBe('nestedObj')
        expect(prop.nameDb).toBe('nestedObj')
        expect(prop.key).toBeUndefined()
        expect(prop.transient).toBeFalsy()
        expect(prop.typeInfo).toBeDefined()
        expect(prop.typeInfo.isCustom).toBeTruthy()
        expect(prop.typeInfo.type).toBe(NestedObject)
      })
    })
  })

  describe('indexes', () => {
    describe('simple index (partition key, no range key)', () => {
      let metadata: Metadata<ModelWithGSI>

      beforeEach(() => {
        metadata = MetadataHelper.get(ModelWithGSI)
      })

      it('should add indexes on model', () => {
        expect(metadata.modelOptions.globalSecondaryIndexes).toBeDefined()
        expect(metadata.modelOptions.globalSecondaryIndexes.size).toBe(1)
        expect(metadata.modelOptions.globalSecondaryIndexes.get('active-index')).toBeDefined()
        expect(metadata.modelOptions.globalSecondaryIndexes.get('active-index').partitionKey).toBe('active')
        expect(metadata.modelOptions.globalSecondaryIndexes.get('active-index').sortKey).toBeUndefined()
      })

      it('should define the index on property metadata', () => {
        const propMeta = metadata.forProperty('active')
        expect(propMeta).toBeDefined()
        expect(propMeta.keyForGSI).toBeDefined()
        expect(Object.keys(propMeta.keyForGSI).length).toBe(1)
        expect(propMeta.keyForGSI['active-index']).toBeDefined()
        expect(propMeta.keyForGSI['active-index']).toBe('HASH')
      })
    })

    describe('index (partition key and range key)', () => {
      let metadata: Metadata<DifferentModel>

      beforeEach(() => {
        metadata = MetadataHelper.get(DifferentModel)
      })

      it('should add indexes on model', () => {
        expect(metadata.modelOptions.globalSecondaryIndexes).toBeDefined()
        expect(metadata.modelOptions.globalSecondaryIndexes.size).toBe(1)
        expect(metadata.modelOptions.globalSecondaryIndexes.get('active-index')).toBeDefined()
        expect(metadata.modelOptions.globalSecondaryIndexes.get('active-index').partitionKey).toBe('active')
        expect(metadata.modelOptions.globalSecondaryIndexes.get('active-index').sortKey).toBe('createdAt')
      })

      it('should define the index on property metadata', () => {
        const propMeta = metadata.forProperty('active')
        expect(propMeta).toBeDefined()
        expect(propMeta.keyForGSI).toBeDefined()
        expect(Object.keys(propMeta.keyForGSI).length).toBe(1)
        expect(propMeta.keyForGSI['active-index']).toBeDefined()
        expect(propMeta.keyForGSI['active-index']).toBe('HASH')
      })

      it('should define the index on property metadata', () => {
        const propMeta = metadata.forProperty('createdAt')
        expect(propMeta).toBeDefined()
        expect(propMeta.keyForGSI).toBeDefined()
        expect(Object.keys(propMeta.keyForGSI).length).toBe(1)
        expect(propMeta.keyForGSI['active-index']).toBeDefined()
        expect(propMeta.keyForGSI['active-index']).toBe('RANGE')
      })
    })

    describe('index (a bunch of indexes with wild combinations)', () => {
      let metadata: Metadata<ModelWithABunchOfIndexes>

      beforeEach(() => {
        metadata = MetadataHelper.get(ModelWithABunchOfIndexes)
      })

      it('should add indexes on model', () => {
        expect(metadata.getPartitionKey()).toBeDefined()
        expect(metadata.getPartitionKey()).toBe('myId')

        expect(metadata.getSortKey()).toBeDefined()
        expect(metadata.getSortKey()).toBe('createdAt')

        // metadata.getGlobalIndex(INDEX_ACTIVE_CREATED_AT)
        // metadata.getLocalIndex(INDEX_ACTIVE_CREATED_AT)

        expect(metadata.modelOptions.globalSecondaryIndexes).toBeDefined()
        expect(metadata.modelOptions.globalSecondaryIndexes.size).toBe(1)

        const gsiActive = metadata.getGlobalIndex(INDEX_ACTIVE_CREATED_AT)
        expect(gsiActive).toBeDefined()
        expect(gsiActive.partitionKey).toBe('active')
        expect(gsiActive.sortKey).toBe('createdAt')

        const lsiCount = metadata.getLocalIndex(INDEX_COUNT)
        expect(lsiCount).toBeDefined()
        expect(lsiCount.partitionKey).toBe('myId')
        expect(lsiCount.sortKey).toBe('count')
      })
    })

    xdescribe('index (multiple range keys for same index)', () => {
      // let metadata: Metadata<ModelWithWrongIndexes>;
      //
      // beforeEach(() => {
      //   metadata = MetadataHelper.get(ModelWithWrongIndexes);
      // });

      it('should throw error', () => {
        expect(() => {
          MetadataHelper.forModel(ModelWithWrongIndexes)
        }).toThrowError()
      })
    })
  })
})

function getProperty<T, K extends keyof T>(
  modelOptions: ModelMetadata<T>,
  propertyKey: K
): PropertyMetadata<T[K]> | undefined {
  return modelOptions.properties.find(property => property.name === propertyKey)
}