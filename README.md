# node-sidecar-toolbox
Tools to modifie sidecars (xmp) 

## time-leaps-exposure.js

This tool is used to change exposure over time
If you are creating a timeleaps from day to night, the exposure will change

For longer shots, you need to do multiple Timeleaps from your Camera.
Thats why you are able to set the start and the count of images.

Tutorial will follow on YouTube...

Usage:
 > node time-leaps-exposure.js path first count startExposure endExposure


| Parameter     | Description                                                            |
| ------------- | ---------------------------------------------------------------------- |
|sidecarPath    | The folder where the xmp-files are stored, can be relative or absolute |
|first          |The first item to use, it's the n-th xmp in the folder                  |
|count          |How many items should be used for this operation                        |
|startExposure  |The start Exposure, this will be used for the first item                |
|endExposure    |The end exposure, this is be the theoretically end exposure, but will not be used, the exposure of the last item will be: endExposure - ((endExposure - startExposure) / count)|
